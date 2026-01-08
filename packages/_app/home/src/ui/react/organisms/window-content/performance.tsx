"use client"

import { cn } from "@kelvan-design/ui/cn"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import React, { useEffect, useMemo, useRef, useState } from "react"

const HISTORY_POINTS = 60
const UI_HZ = 4
const JANK_MS = 50

function clamp(v: number, min: number, max: number) {
	return Math.min(max, Math.max(min, v))
}

function percentile(values: number[], p: number) {
	if (values.length === 0) return 0
	const sorted = [...values].sort((a, b) => a - b)
	const idx = Math.min(
		sorted.length - 1,
		Math.max(0, Math.floor(p * (sorted.length - 1))),
	)
	return sorted[idx]!
}

type TUi = {
	fps: number
	avgMs: number
	p95Ms: number
	jankPct: number
	longTaskMs10s: number
	heapUsedMB: number | null
	heapTotalMB: number | null
	fpsHistory: number[]
	fpMs: number | null
	fcpMs: number | null
	lcpMs: number | null
	cls: number | null
}

function usePerformanceTelemetry(stressEnabled: boolean) {
	const [ui, setUi] = useState<TUi>(() => ({
		fps: 0,
		avgMs: 0,
		p95Ms: 0,
		jankPct: 0,
		longTaskMs10s: 0,
		heapUsedMB: null,
		heapTotalMB: null,
		fpsHistory: [],
		fpMs: null,
		fcpMs: null,
		lcpMs: null,
		cls: null,
	}))

	const rafRef = useRef<number | null>(null)
	const lastTsRef = useRef<number>(0)
	const lastUiCommitRef = useRef<number>(0)

	const frameTimesRef = useRef<number[]>([])
	const fpsHistoryRef = useRef<number[]>([])
	const longTasksRef = useRef<{ t: number; d: number }[]>([])

	const paintsRef = useRef<{ fp: number | null; fcp: number | null }>({
		fp: null,
		fcp: null,
	})
	const lcpRef = useRef<number | null>(null)
	const clsRef = useRef<number>(0)

	const burnCpu = (ms: number) => {
		const start = performance.now()
		// eslint-disable-next-line no-empty
		while (performance.now() - start < ms) {}
	}

	useEffect(() => {
		let poLong: PerformanceObserver | null = null
		let poPaint: PerformanceObserver | null = null
		let poLcp: PerformanceObserver | null = null
		let poCls: PerformanceObserver | null = null

		// Long Tasks
		try {
			poLong = new PerformanceObserver((list) => {
				const now = performance.now()
				for (const entry of list.getEntries()) {
					const d =
						typeof (entry as PerformanceEntry).duration === "number"
							? (entry as PerformanceEntry).duration
							: 0
					longTasksRef.current.push({ t: now, d })
				}
			})
			poLong.observe({ entryTypes: ["longtask"] })
		} catch {
			// do nothing
		}

		try {
			poPaint = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType !== "paint") continue
					if (entry.name === "first-paint") {
						paintsRef.current.fp ??= entry.startTime
					}
					if (entry.name === "first-contentful-paint") {
						paintsRef.current.fcp ??= entry.startTime
					}
				}
			})
			poPaint.observe({ entryTypes: ["paint"] })
		} catch {
			// do nothing
		}

		try {
			poLcp = new PerformanceObserver((list) => {
				const entries = list.getEntries()
				const last = entries[entries.length - 1]
				if (last) lcpRef.current = last.startTime
			})
			poLcp.observe({ type: "largest-contentful-paint", buffered: true })
		} catch {
			// do nothing
		}

		try {
			poCls = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					// @ts-expect-error hadRecentInput is nonstandard
					if (entry.hadRecentInput) continue
					// @ts-expect-error value is nonstandard
					clsRef.current += entry.value ?? 0
				}
			})
			poCls.observe({ type: "layout-shift", buffered: true })
		} catch {
			// do nothing
		}

		const tick = (ts: number) => {
			const last = lastTsRef.current || ts
			const dt = ts - last
			lastTsRef.current = ts

			// ignore huge gaps (tab switch / background)
			if (dt > 0 && dt < 250) {
				frameTimesRef.current.push(dt)
				if (frameTimesRef.current.length > 180)
					frameTimesRef.current.splice(
						0,
						frameTimesRef.current.length - 180,
					)
			}

			// stress: a little JS burn so the graphs actually react (optional)
			if (stressEnabled) burnCpu(3)

			const shouldCommit = ts - lastUiCommitRef.current >= 1000 / UI_HZ
			if (shouldCommit) {
				lastUiCommitRef.current = ts

				const frames = frameTimesRef.current
				const avgMs = frames.length
					? frames.reduce((a, b) => a + b, 0) / frames.length
					: 0
				const fps = avgMs ? Math.round(1000 / avgMs) : 0
				const p95Ms = percentile(frames, 0.95)

				const janky = frames.filter((x) => x >= JANK_MS).length
				const jankPct = frames.length
					? Math.round((janky / frames.length) * 100)
					: 0

				// long tasks in last 10s
				const tenSecAgo = ts - 10_000
				longTasksRef.current = longTasksRef.current.filter(
					(x) => x.t >= tenSecAgo,
				)
				const longTaskMs10s = Math.round(
					longTasksRef.current.reduce((a, b) => a + b.d, 0),
				)

				// heap (Chromium only)
				let heapUsedMB: number | null = null
				let heapTotalMB: number | null = null
				const mem =
					typeof performance !== "undefined"
						? // @ts-expect-error performance.memory is nonstandard
							performance.memory
						: null
				if (mem?.usedJSHeapSize && mem?.totalJSHeapSize) {
					heapUsedMB = Math.round(mem.usedJSHeapSize / 1024 / 1024)
					heapTotalMB = Math.round(mem.totalJSHeapSize / 1024 / 1024)
				}

				// history ring
				fpsHistoryRef.current.push(clamp(fps, 0, 240))
				if (fpsHistoryRef.current.length > HISTORY_POINTS) {
					fpsHistoryRef.current.splice(
						0,
						fpsHistoryRef.current.length - HISTORY_POINTS,
					)
				}

				setUi({
					fps,
					avgMs: Math.round(avgMs * 10) / 10,
					p95Ms: Math.round(p95Ms * 10) / 10,
					jankPct,
					longTaskMs10s,
					heapUsedMB,
					heapTotalMB,
					fpsHistory: [...fpsHistoryRef.current],
					fpMs: paintsRef.current.fp
						? Math.round(paintsRef.current.fp)
						: null,
					fcpMs: paintsRef.current.fcp
						? Math.round(paintsRef.current.fcp)
						: null,
					lcpMs: lcpRef.current ? Math.round(lcpRef.current) : null,
					cls: clsRef.current
						? Math.round(clsRef.current * 1000) / 1000
						: 0,
				})
			}

			rafRef.current = requestAnimationFrame(tick)
		}

		const onVis = () => {
			lastTsRef.current = performance.now()
			frameTimesRef.current = []
		}

		document.addEventListener("visibilitychange", onVis)
		rafRef.current = requestAnimationFrame(tick)

		return () => {
			document.removeEventListener("visibilitychange", onVis)
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			try {
				poLong?.disconnect()
				poPaint?.disconnect()
				poLcp?.disconnect()
				poCls?.disconnect()
			} catch {
				// ignore
			}
		}
	}, [stressEnabled])

	return ui
}

export function Performance() {
	const [stress, setStress] = useState(false)
	const {
		fps,
		avgMs,
		p95Ms,
		jankPct,
		longTaskMs10s,
		heapUsedMB,
		heapTotalMB,
		fpsHistory,
		fpMs,
		fcpMs,
		lcpMs,
		cls,
	} = usePerformanceTelemetry(stress)

	const maxForGraph = useMemo(() => {
		const m = fpsHistory.length ? Math.max(...fpsHistory) : 120
		return clamp(Math.ceil(m / 30) * 30, 60, 240)
	}, [fpsHistory])

	return (
		<Flex className="relative h-full w-full overflow-y-auto overflow-x-hidden">
			<StressStage enabled={stress} />
			<GradientBg />
			<YStack className="relative z-10 flex h-full flex-col">
				<Header
					fps={fps}
					jankPct={jankPct}
					stress={stress}
					setStress={setStress}
					avgMs={avgMs}
				/>
				<Body
					fps={fps}
					avgMs={avgMs}
					p95Ms={p95Ms}
					jankPct={jankPct}
					longTaskMs10s={longTaskMs10s}
					heapUsedMB={heapUsedMB}
					heapTotalMB={heapTotalMB}
					fpsHistory={fpsHistory}
					fpMs={fpMs}
					fcpMs={fcpMs}
					lcpMs={lcpMs}
					cls={cls}
					maxForGraph={maxForGraph}
				/>
				<Footer />
			</YStack>
		</Flex>
	)
}

function StatusBadge({ fps, jankPct }: { fps: number; jankPct: number }) {
	const status =
		fps >= 58 && jankPct <= 3
			? "SMOOTH"
			: fps >= 45 && jankPct <= 10
				? "OK"
				: "JANK"

	const cls =
		status === "SMOOTH"
			? "bg-emerald-500/15 text-emerald-200 border-emerald-400/20"
			: status === "OK"
				? "bg-yellow-500/15 text-yellow-100 border-yellow-300/20"
				: "bg-rose-500/15 text-rose-100 border-rose-300/20"

	return (
		<div
			className={cn(
				"inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-widest",
				cls,
			)}
		>
			<span className="inline-block h-2 w-2 rounded-full bg-current opacity-80" />
			{status}
		</div>
	)
}

function StatRow({
	label,
	value,
	sub,
}: {
	label: string
	value: React.ReactNode
	sub?: React.ReactNode
}) {
	return (
		<XStack className="items-baseline justify-between space-x-4">
			<TextBody
				size="xs"
				variant="accent-foreground"
				className="font-semibold"
			>
				{label}
			</TextBody>
			<div className="text-right">
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="font-semibold"
				>
					{value}
				</TextBody>
				{sub ? (
					<TextBody size="2xs" variant="muted-foreground">
						{sub}
					</TextBody>
				) : null}
			</div>
		</XStack>
	)
}

function StressStage({ enabled }: { enabled: boolean }) {
	if (!enabled) return null
	return (
		<div className="pointer-events-none absolute inset-0 opacity-80">
			<div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_55%,transparent_100%)]">
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						key={i}
						className="absolute rounded-full blur-2xl mix-blend-screen animate-[floaty_4.5s_ease-in-out_infinite]"
						style={{
							left: `${(i * 13) % 90}%`,
							top: `${(i * 19) % 50}%`,
							width: `${160 + (i % 4) * 60}px`,
							height: `${160 + (i % 4) * 60}px`,
							background:
								"radial-gradient(circle at 30% 30%, rgba(99,102,241,0.45), rgba(236,72,153,0.22), transparent 60%)",
							animationDelay: `${i * 0.18}s`,
						}}
					/>
				))}
			</div>
		</div>
	)
}

function Sparkline({
	values,
	width = 240,
	height = 56,
	max = 120,
}: {
	values: number[]
	width?: number
	height?: number
	max?: number
}) {
	const points = useMemo(() => {
		if (!values.length) return ""
		return values
			.map((v, i) => {
				const x = (i / Math.max(1, values.length - 1)) * width
				const y = height - (clamp(v, 0, max) / max) * height
				return `${x.toFixed(2)},${y.toFixed(2)}`
			})
			.join(" ")
	}, [values, width, height, max])

	const y60 = height - (60 / max) * height
	const y30 = height - (30 / max) * height

	return (
		<svg width={width} height={height} className="block">
			<defs>
				<linearGradient id="fpsFill" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="rgba(99,102,241,0.35)" />
					<stop offset="100%" stopColor="rgba(99,102,241,0)" />
				</linearGradient>
			</defs>

			<line
				x1="0"
				x2={width}
				y1={y60}
				y2={y60}
				stroke="rgba(255,255,255,0.18)"
				strokeDasharray="3 3"
			/>
			<line
				x1="0"
				x2={width}
				y1={y30}
				y2={y30}
				stroke="rgba(255,255,255,0.10)"
				strokeDasharray="3 3"
			/>

			{values.length > 1 && (
				<path
					d={`M 0 ${height} L ${points.replaceAll(",", " ")} L ${width} ${height} Z`}
					fill="url(#fpsFill)"
				/>
			)}
			<polyline
				points={points}
				fill="none"
				stroke="rgba(255,255,255,0.9)"
				strokeWidth="1.5"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
		</svg>
	)
}

function GradientBg() {
	return (
		<div
			className="pointer-events-none absolute inset-0 opacity-70"
			style={{
				background:
					"radial-gradient(800px 260px at 20% 0%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(135deg, rgba(99,102,241,0.12), transparent 45%)",
			}}
		/>
	)
}

interface IHeaderProps {
	fps: TUi["fps"]
	jankPct: TUi["jankPct"]
	stress: boolean
	setStress: React.Dispatch<React.SetStateAction<boolean>>
	avgMs: TUi["avgMs"]
}

function Header({ fps, jankPct, stress, setStress, avgMs }: IHeaderProps) {
	return (
		<Flex className="flex items-center justify-between border-b border-white/10 p-3 space-x-4">
			<StatusBadge fps={fps} jankPct={jankPct} />
			<XStack className="items-center gap-2">
				<div
					onClick={() => setStress((s) => !s)}
					className={cn(
						"rounded-full border px-3 py-1 text-[11px] font-bold tracking-widest shrink-0 cursor-pointer",
						stress
							? "border-rose-300/30 bg-rose-500/15 text-rose-100"
							: "border-white/15 bg-white/5 text-white/60 hover:bg-white/10",
					)}
				>
					STRESS {stress ? "ON" : "OFF"}
				</div>
				<Flex className="flex-wrap space-x-2 space-y-1/2">
					<TextBody size="xs" variant="accent-foreground">
						{fps} <span className="text-muted-foreground">fps</span>
					</TextBody>
					<TextBody size="xs" variant="muted-foreground">
						{avgMs}ms avg
					</TextBody>
				</Flex>
			</XStack>
		</Flex>
	)
}

interface IBodyProps {
	fps: TUi["fps"]
	avgMs: TUi["avgMs"]
	p95Ms: TUi["p95Ms"]
	jankPct: TUi["jankPct"]
	longTaskMs10s: TUi["longTaskMs10s"]
	heapUsedMB: TUi["heapUsedMB"]
	heapTotalMB: TUi["heapTotalMB"]
	fpsHistory: TUi["fpsHistory"]
	fpMs: TUi["fpMs"]
	fcpMs: TUi["fcpMs"]
	lcpMs: TUi["lcpMs"]
	cls: TUi["cls"]
	maxForGraph: number
}

function Body({
	fps,
	avgMs,
	p95Ms,
	jankPct,
	longTaskMs10s,
	heapUsedMB,
	heapTotalMB,
	fpsHistory,
	fpMs,
	fcpMs,
	lcpMs,
	cls,
	maxForGraph,
}: IBodyProps) {
	return (
		<Flex className="gap-4 p-4 flex-wrap">
			<YStack className="col-span-7 space-y-4">
				<Flex className="items-end justify-between rounded-xl border border-white/10 bg-black/20 p-4 gap-4 flex-wrap">
					<YStack className="min-w-[120px]">
						<TextBody
							size="2xs"
							variant="muted-foreground"
							className="font-bold tracking-widest text-white/50"
						>
							FPS
						</TextBody>
						<TextBody
							variant="accent-foreground"
							size="5xl"
							className="mt-1 font-black tracking-tight text-white"
						>
							{fps}
							<span className="ml-2 text-base font-semibold text-muted-foreground">
								fps
							</span>
						</TextBody>
						<YStack>
							<TextBody size="xs" variant="muted-foreground">
								p95 frame:{" "}
								<span className="text-accent-foreground">
									{p95Ms}ms
								</span>
							</TextBody>
							<TextBody size="xs" variant="muted-foreground">
								jank:{" "}
								<span className="text-accent-foreground">
									{jankPct}%
								</span>
							</TextBody>
						</YStack>
					</YStack>
					<YStack className="rounded-lg border border-white/10 bg-white/5 p-2 space-y-1">
						<Sparkline
							values={fpsHistory}
							max={maxForGraph}
							width={220}
							height={56}
						/>
						<XStack className="justify-between">
							<TextBody size="2xs" variant="muted-foreground">
								30
							</TextBody>
							<TextBody size="2xs" variant="muted-foreground">
								60
							</TextBody>
						</XStack>
					</YStack>
				</Flex>

				<Flex className="gap-4 flex-wrap">
					<YStack
						className={cn(
							"flex-1 min-w-[140px]",
							"rounded-xl p-3 space-y-1",
							"border border-white/10 bg-black/20",
						)}
					>
						<TextBody
							size="xs"
							variant="muted-foreground"
							className="font-bold tracking-widest"
						>
							FRAME TIME
						</TextBody>
						<TextBody
							size="2xl"
							variant="accent-foreground"
							className="font-black"
						>
							{avgMs}
							<span className="ml-1 text-xs font-semibold text-muted-foreground">
								ms avg
							</span>
						</TextBody>
					</YStack>

					<YStack
						className={cn(
							"flex-1 min-w-[140px]",
							"rounded-xl p-3 space-y-1",
							"border border-white/10 bg-black/20",
						)}
					>
						<TextBody
							size="xs"
							variant="muted-foreground"
							className="font-bold tracking-widest"
						>
							JANK
						</TextBody>
						<TextBody
							size="2xl"
							variant="accent-foreground"
							className="font-black"
						>
							{jankPct}
							<span className="ml-1 text-xs font-semibold text-muted-foreground">
								%
							</span>
						</TextBody>
						<TextBody size="2xs" variant="muted-foreground">
							Frames ≥ {JANK_MS}ms
						</TextBody>
					</YStack>
				</Flex>

				<YStack className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-3">
					<TextBody
						size="xs"
						variant="muted-foreground"
						className="font-bold tracking-widest"
					>
						WEB VITALS
					</TextBody>
					<YStack className="text-xs space-y-3">
						<Flex className="flex-wrap gap-3">
							<YStack className="rounded-lg border border-white/10 bg-black/20 p-3 min-w-[170px] flex-1">
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									FP
								</TextBody>
								<TextBody
									size="lg"
									variant="accent-foreground"
									className="font-black"
								>
									{fpMs == null ? "—" : `${fpMs}ms`}
								</TextBody>
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									first paint
								</TextBody>
							</YStack>
							<YStack className="rounded-lg border border-white/10 bg-black/20 p-3 min-w-[170px] flex-1">
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									FCP
								</TextBody>
								<TextBody
									size="lg"
									variant="accent-foreground"
									className="font-black"
								>
									{fcpMs == null ? "—" : `${fcpMs}ms`}
								</TextBody>
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									first contentful paint
								</TextBody>
							</YStack>
						</Flex>
						<Flex className="flex-wrap gap-3">
							<YStack className="rounded-lg border border-white/10 bg-black/20 p-3 min-w-[170px] flex-1">
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									LCP
								</TextBody>
								<TextBody
									size="lg"
									variant="accent-foreground"
									className="font-black"
								>
									{lcpMs == null ? "—" : `${lcpMs}ms`}
								</TextBody>
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									largest contentful paint
								</TextBody>
							</YStack>
							<YStack className="rounded-lg border border-white/10 bg-black/20 p-3 min-w-[170px] flex-1">
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									CLS
								</TextBody>
								<TextBody
									size="lg"
									variant="accent-foreground"
									className="font-black"
								>
									{cls == null ? "—" : cls}
								</TextBody>
								<TextBody
									size="2xs"
									variant="muted-foreground"
									className="font-bold tracking-widest"
								>
									cumulative layout shift
								</TextBody>
							</YStack>
						</Flex>
					</YStack>
				</YStack>
			</YStack>

			<YStack
				className={cn(
					"min-w-[300px] col-span-7 mb-auto",
					"p-4 space-y-4 rounded-xl",
					"bg-black/20 border border-white/10",
				)}
			>
				<TextBody
					size="xs"
					variant="muted-foreground"
					className="font-bold tracking-widest"
				>
					DIAGNOSTICS
				</TextBody>
				<YStack className="space-y-2">
					<StatRow
						label="Long tasks (last 10s)"
						value={`${longTaskMs10s}ms`}
						sub="If this climbs, JS is blocking the main thread"
					/>
					<StatRow
						label="Heap"
						value={
							heapUsedMB == null
								? "—"
								: `${heapUsedMB} / ${heapTotalMB ?? "?"} MB`
						}
						sub={
							heapUsedMB == null
								? "Only available in Chromium"
								: "JS heap usage"
						}
					/>
					<StatRow
						label="Target"
						value="60fps"
						sub="~16.7ms per frame"
					/>
				</YStack>
			</YStack>
		</Flex>
	)
}

function Footer() {
	return (
		<XStack className="items-center justify-between border-t border-white/10 px-4 py-2">
			<TextBody size="xs" variant="muted-foreground">
				rAF sampling · UI updates {UI_HZ}Hz
			</TextBody>
			<TextBody size="xs" variant="muted-foreground">
				history: {HISTORY_POINTS} points
			</TextBody>
		</XStack>
	)
}
