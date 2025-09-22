<!-- src/components/ProgressBar.vue -->
<template>
  <div class="progress-container" :class="containerClasses">
    <!-- Label (可選) -->
    <div
      v-if="label || $slots.label"
      class="progress-label"
      :class="labelClasses"
    >
      <slot name="label">
        {{ label }}
      </slot>
      <span v-if="showValue" class="progress-value">
        {{ props.indeterminate ? '' : `${Math.round(percentage)}%` }}
      </span>
    </div>

    <!-- 進度條主體 -->
    <div
      :class="trackClasses"
      role="progressbar"
    >
      <!-- 背景軌道 -->
      <div class="progress-track" :class="trackBackgroundClasses"></div>

      <!-- 緩衝進度條 (buffered mode) -->
      <div
        v-if="bufferValue !== undefined"
        class="progress-buffer"
        :class="bufferClasses"
        :style="bufferStyle"
      ></div>

      <!-- 主進度條 -->
      <div
        class="progress-fill"
        :class="fillClasses"
        :style="fillStyle"
      >
        <!-- 分段進度條的標記 -->
        <div
          v-if="segments && segments.length > 0"
          class="progress-segments"
        >
          <div
            v-for="(segment, index) in segments"
            :key="index"
            class="progress-segment-marker"
            :style="{ left: `${Math.min(Math.max((segment / props.max) * 100, 0), 100)}%` }"
          ></div>
        </div>

        <!-- 不確定狀態的動畫元素 -->
        <div
          v-if="props.indeterminate"
          class="progress-indeterminate"
          :class="indeterminateClasses"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

/**
 * ProgressBar 組件的屬性介面
 * 一個功能豐富、高度可定制的進度條組件，支援多種模式和樣式
 */
export interface ProgressBarProps {
  /** 當前進度值 @default 0 */
  value?: number
  /** 最大值 @default 100 */
  max?: number

  /** 進度條樣式變體 @default 'default' */
  variant?: 'default' | 'health' | 'experience' | 'mana' | 'explore' | 'success' | 'warning' | 'error'
  /** 不確定狀態，顯示無限循環動畫 @default false */
  indeterminate?: boolean

  /** 緩衝值，用於顯示緩衝進度 */
  bufferValue?: number

  /** 分段標記點陣列，用於顯示進度分段 */
  segments?: number[]

  /** 進度條尺寸 @default 'md' */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** 邊框圓角 @default 'full' */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'

  /** 標籤文字 */
  label?: string
  /** 是否顯示百分比數值 @default false */
  showValue?: boolean

  /** 是否啟用動畫效果 @default true */
  animated?: boolean
  /** 動畫持續時間（毫秒） @default 300 */
  animationDuration?: number
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  max: 100,
  variant: 'default',
  indeterminate: false,
  size: 'md',
  radius: 'full',
  showValue: false,
  animated: true,
  animationDuration: 300
})

/** 計算當前進度百分比，限制在 0-100 範圍內 */
const percentage = computed(() => {
  if (props.indeterminate) return 0
  
  // 錯誤處理：確保數值有效
  const value = isNaN(props.value) ? 0 : props.value
  const max = isNaN(props.max) || props.max <= 0 ? 100 : props.max
  
  return Math.min(Math.max((value / max) * 100, 0), 100)
})

/** 計算緩衝進度百分比 */
const bufferPercentage = computed(() => {
  if (props.bufferValue === undefined) return 0
  
  // 錯誤處理：確保數值有效
  const bufferValue = isNaN(props.bufferValue) ? 0 : props.bufferValue
  const max = isNaN(props.max) || props.max <= 0 ? 100 : props.max
  
  return Math.min(Math.max((bufferValue / max) * 100, 0), 100)
})


/** 優化的樣式計算 - 容器類別 */
const containerClasses = computed(() => [
  'progress-container',
  `progress-container--${props.size}`,
  {
    'progress-container--animated': props.animated
  }
])

const trackClasses = computed(() => [
  'progress-track-wrapper',
  `progress-track--${props.size}`,
  `progress-track--radius-${props.radius}`,
  `progress-track--${props.variant}`
])

const trackBackgroundClasses = computed(() => [
  'progress-track-bg',
  `progress-track-bg--radius-${props.radius}`
])

const fillClasses = computed(() => [
  'progress-fill',
  `progress-fill--${props.variant}`,
  `progress-fill--radius-${props.radius}`,
  {
    'progress-fill--indeterminate': props.indeterminate,
    'progress-fill--animated': props.animated && !props.indeterminate
  }
])

const bufferClasses = computed(() => [
  'progress-buffer',
  `progress-buffer--${props.variant}`,
  `progress-buffer--radius-${props.radius}`
])

const indeterminateClasses = computed(() => [
  'progress-indeterminate-animation',
  `progress-indeterminate--${props.variant}`
])

const labelClasses = computed(() => [
  'progress-label-wrapper',
  `progress-label--${props.size}`
])

// 內聯樣式
const fillStyle = computed((): CSSProperties => {
  const style: CSSProperties = {}

  if (!props.indeterminate) {
    style.width = `${percentage.value}%`
  }

  if (props.animated && !props.indeterminate) {
    style.transition = `width ${props.animationDuration}ms ease-out`
  }

  return style
})

const bufferStyle = computed((): CSSProperties => ({
  width: `${bufferPercentage.value}%`,
  transition: props.animated ? `width ${props.animationDuration}ms ease-out` : undefined
}))
</script>

<style scoped>
@reference "@/assets/main.css";

/* 容器 */
.progress-container {
  @apply w-full;
}

.progress-container--xs { @apply space-y-1; }
.progress-container--sm { @apply space-y-1; }
.progress-container--md { @apply space-y-2; }
.progress-container--lg { @apply space-y-2; }
.progress-container--xl { @apply space-y-3; }

/* 標籤 */
.progress-label-wrapper {
  @apply flex justify-between items-center;
}

.progress-label--xs { @apply text-xs; }
.progress-label--sm { @apply text-sm; }
.progress-label--md { @apply text-sm; }
.progress-label--lg { @apply text-base; }
.progress-label--xl { @apply text-lg; }

.progress-value {
  @apply font-medium tabular-nums;
}

/* 軌道包裝器 */
.progress-track-wrapper {
  @apply relative overflow-hidden;
}

.progress-track--xs { @apply h-1; }
.progress-track--sm { @apply h-2; }
.progress-track--md { @apply h-3; }
.progress-track--lg { @apply h-4; }
.progress-track--xl { @apply h-6; }

.progress-track--radius-none { @apply rounded-none; }
.progress-track--radius-sm { @apply rounded-sm; }
.progress-track--radius-md { @apply rounded-md; }
.progress-track--radius-lg { @apply rounded-lg; }
.progress-track--radius-full { @apply rounded-full; }

/* 背景軌道 */
.progress-track-bg {
  @apply absolute inset-0 bg-gray-200;
}

.progress-track-bg--radius-none { @apply rounded-none; }
.progress-track-bg--radius-sm { @apply rounded-sm; }
.progress-track-bg--radius-md { @apply rounded-md; }
.progress-track-bg--radius-lg { @apply rounded-lg; }
.progress-track-bg--radius-full { @apply rounded-full; }

/* 緩衝進度條 */
.progress-buffer {
  @apply absolute left-0 top-0 h-full bg-gray-300/50;
}

.progress-buffer--radius-none { @apply rounded-none; }
.progress-buffer--radius-sm { @apply rounded-sm; }
.progress-buffer--radius-md { @apply rounded-md; }
.progress-buffer--radius-lg { @apply rounded-lg; }
.progress-buffer--radius-full { @apply rounded-full; }

/* 主進度條 */
.progress-fill {
  @apply relative h-full;
  width: 0%;
}

.progress-fill--animated {
  @apply transition-all duration-300 ease-out;
}

.progress-fill--radius-none { @apply rounded-none; }
.progress-fill--radius-sm { @apply rounded-sm; }
.progress-fill--radius-md { @apply rounded-md; }
.progress-fill--radius-lg { @apply rounded-lg; }
.progress-fill--radius-full { @apply rounded-full; }

/* 變體顏色 */
.progress-fill--default { @apply bg-primary-500; }
.progress-fill--health { background: var(--gradient-health, linear-gradient(90deg, #ef4444 0%, #dc2626 100%)); }
.progress-fill--experience { background: var(--gradient-experience, linear-gradient(90deg, #22c55e 0%, #16a34a 100%)); }
.progress-fill--mana { @apply bg-blue-500; }
.progress-fill--explore { background: var(--gradient-explore, linear-gradient(90deg, #10b981 0%, #059669 100%)); }
.progress-fill--success { @apply bg-green-500; }
.progress-fill--warning { @apply bg-yellow-500; }
.progress-fill--error { @apply bg-red-500; }

/* 分段標記 */
.progress-segments {
  @apply absolute inset-0 pointer-events-none;
}

.progress-segment-marker {
  @apply absolute top-0 h-full w-px bg-white/30 -translate-x-0.5;
}

/* 不確定狀態動畫 */
.progress-fill--indeterminate {
  @apply w-full;
}

.progress-indeterminate-animation {
  @apply absolute left-0 top-0 h-full w-full;
  background: linear-gradient(
    90deg,
    transparent 0%,
    currentColor 25%,
    currentColor 75%,
    transparent 100%
  );
  animation: indeterminate 2s infinite linear;
  transform: translateX(-100%);
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-indeterminate--health { @apply text-red-500; }
.progress-indeterminate--experience { @apply text-green-500; }
.progress-indeterminate--mana { @apply text-blue-500; }
.progress-indeterminate--explore { @apply text-emerald-500; }
.progress-indeterminate--success { @apply text-green-500; }
.progress-indeterminate--warning { @apply text-yellow-500; }
.progress-indeterminate--error { @apply text-red-500; }
.progress-indeterminate--default { @apply text-primary-500; }
</style>
