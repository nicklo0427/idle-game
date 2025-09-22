<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- 標題 -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">ProgressBar 組件展示</h1>
        <p class="text-lg text-gray-600">一個功能豐富、高度可定制的 Vue 進度條組件</p>
      </div>

      <!-- 互動測試區 -->
      <section class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">🎮 互動測試</h2>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- 控制面板 -->
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">數值 ({{ demoValue }})</label>
                <input 
                  v-model.number="demoValue" 
                  type="range" 
                  min="0" 
                  :max="demoMax" 
                  class="w-full"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">最大值 ({{ demoMax }})</label>
                <input 
                  v-model.number="demoMax" 
                  type="range" 
                  min="50" 
                  max="200" 
                  class="w-full"
                >
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">變體</label>
                <select v-model="demoVariant" class="w-full p-2 border border-gray-300 rounded-md">
                  <option value="default">Default</option>
                  <option value="health">Health</option>
                  <option value="experience">Experience</option>
                  <option value="mana">Mana</option>
                  <option value="explore">Explore</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">尺寸</label>
                <select v-model="demoSize" class="w-full p-2 border border-gray-300 rounded-md">
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">圓角</label>
                <select v-model="demoRadius" class="w-full p-2 border border-gray-300 rounded-md">
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="full">Full</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">標籤</label>
                <input 
                  v-model="demoLabel" 
                  type="text" 
                  placeholder="輸入標籤文字..." 
                  class="w-full p-2 border border-gray-300 rounded-md"
                >
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <label class="flex items-center">
                <input v-model="demoShowValue" type="checkbox" class="mr-2">
                顯示數值
              </label>
              <label class="flex items-center">
                <input v-model="demoAnimated" type="checkbox" class="mr-2">
                動畫效果
              </label>
              <label class="flex items-center">
                <input v-model="demoIndeterminate" type="checkbox" class="mr-2">
                不確定狀態
              </label>
            </div>
          </div>

          <!-- 預覽區 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">預覽</h3>
            <ProgressBar
              :value="demoValue"
              :max="demoMax"
              :variant="demoVariant"
              :size="demoSize"
              :radius="demoRadius"
              :label="demoLabel"
              :show-value="demoShowValue"
              :animated="demoAnimated"
              :indeterminate="demoIndeterminate"
            />
            
            <!-- 代碼展示 -->
            <div class="mt-6">
              <h4 class="text-sm font-medium text-gray-700 mb-2">程式碼</h4>
              <pre class="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;ProgressBar
  :value="{{ demoValue }}"
  :max="{{ demoMax }}"
  variant="{{ demoVariant }}"
  size="{{ demoSize }}"
  radius="{{ demoRadius }}"{{ demoLabel ? `\n  label="${demoLabel}"` : '' }}{{ demoShowValue ? '\n  :show-value="true"' : '' }}{{ !demoAnimated ? '\n  :animated="false"' : '' }}{{ demoIndeterminate ? '\n  :indeterminate="true"' : '' }}
/&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 變體展示 -->
      <section class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">🎨 樣式變體</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="variant in variants" :key="variant.name" class="space-y-3">
            <h3 class="font-semibold text-gray-700 capitalize">{{ variant.name }}</h3>
            <ProgressBar
              :value="variant.value"
              :max="100"
              :variant="variant.name"
              :label="variant.label"
              :show-value="true"
              size="md"
            />
          </div>
        </div>
      </section>

      <!-- 尺寸展示 -->
      <section class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">📏 尺寸選項</h2>
        
        <div class="space-y-6">
          <div v-for="size in sizes" :key="size.name" class="space-y-2">
            <h3 class="font-semibold text-gray-700">{{ size.name }} ({{ size.value }})</h3>
            <ProgressBar
              :value="75"
              :max="100"
              :size="size.value"
              variant="default"
              label="進度"
              :show-value="true"
            />
          </div>
        </div>
      </section>

      <!-- 特殊功能展示 -->
      <section class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">⭐ 特殊功能</h2>
        
        <div class="space-y-8">
          <!-- 不確定狀態 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">不確定狀態動畫</h3>
            <ProgressBar
              :indeterminate="true"
              variant="default"
              label="載入中..."
              size="lg"
            />
          </div>

          <!-- 緩衝模式 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">緩衝模式</h3>
            <ProgressBar
              :value="bufferDemo.current"
              :buffer-value="bufferDemo.buffer"
              :max="100"
              variant="default"
              label="視頻緩衝"
              :show-value="true"
              size="lg"
            />
            <p class="text-sm text-gray-500 mt-2">
              當前播放: {{ bufferDemo.current }}% | 已緩衝: {{ bufferDemo.buffer }}%
            </p>
          </div>

          <!-- 分段標記 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">分段標記</h3>
            <ProgressBar
              :value="70"
              :max="100"
              :segments="[25, 50, 75]"
              variant="experience"
              label="等級進度"
              :show-value="true"
              size="lg"
            />
            <p class="text-sm text-gray-500 mt-2">
              標記點: 25%, 50%, 75%
            </p>
          </div>

          <!-- 自定義標籤插槽 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">自定義標籤</h3>
            <ProgressBar
              :value="85"
              :max="100"
              variant="success"
              size="lg"
            >
              <template #label>
                <span class="flex items-center gap-2">
                  <span class="text-green-600">✅</span>
                  <span>任務完成度</span>
                </span>
                <span class="text-green-600 font-bold">85/100</span>
              </template>
            </ProgressBar>
          </div>
        </div>
      </section>

      <!-- 遊戲應用場景 -->
      <section class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">🎮 遊戲應用場景</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- 玩家狀態 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">玩家狀態</h3>
            <div class="space-y-3">
              <ProgressBar
                :value="gameStats.hp"
                :max="gameStats.maxHp"
                variant="health"
                label="生命值"
                :show-value="true"
                :animated="true"
              />
              <ProgressBar
                :value="gameStats.mp"
                :max="gameStats.maxMp"
                variant="mana"
                label="魔法值"
                :show-value="true"
                :animated="true"
              />
              <ProgressBar
                :value="gameStats.exp"
                :max="gameStats.maxExp"
                variant="experience"
                label="經驗值"
                :show-value="true"
                :animated="true"
              />
            </div>
          </div>

          <!-- 遊戲活動 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">遊戲活動</h3>
            <div class="space-y-3">
              <ProgressBar
                :value="exploreProgress"
                :max="100"
                variant="explore"
                label="探索進度"
                :show-value="true"
                :animated="true"
                size="lg"
              />
              <button
                @click="startExplore"
                :disabled="isExploring"
                class="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:bg-gray-400"
              >
                {{ isExploring ? '探索中...' : '開始探索' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- API 參考 -->
      <section class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">📚 API 參考</h2>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2 px-4">屬性</th>
                <th class="text-left py-2 px-4">類型</th>
                <th class="text-left py-2 px-4">預設值</th>
                <th class="text-left py-2 px-4">說明</th>
              </tr>
            </thead>
            <tbody class="text-gray-600">
              <tr v-for="prop in apiProps" :key="prop.name" class="border-b">
                <td class="py-2 px-4 font-mono text-blue-600">{{ prop.name }}</td>
                <td class="py-2 px-4 font-mono">{{ prop.type }}</td>
                <td class="py-2 px-4 font-mono">{{ prop.default }}</td>
                <td class="py-2 px-4">{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
import type { ProgressBarProps } from '@/components/ProgressBar.vue'

// 互動測試資料
const demoValue = ref(60)
const demoMax = ref(100)
const demoVariant = ref<ProgressBarProps['variant']>('default')
const demoSize = ref<ProgressBarProps['size']>('md')
const demoRadius = ref<ProgressBarProps['radius']>('full')
const demoLabel = ref('進度')
const demoShowValue = ref(true)
const demoAnimated = ref(true)
const demoIndeterminate = ref(false)

// 變體展示資料
const variants = [
  { name: 'default' as const, value: 60, label: '預設樣式' },
  { name: 'health' as const, value: 85, label: '生命值' },
  { name: 'experience' as const, value: 40, label: '經驗值' },
  { name: 'mana' as const, value: 70, label: '魔法值' },
  { name: 'explore' as const, value: 30, label: '探索進度' },
  { name: 'success' as const, value: 100, label: '成功狀態' },
  { name: 'warning' as const, value: 80, label: '警告狀態' },
  { name: 'error' as const, value: 20, label: '錯誤狀態' }
]

// 尺寸展示資料
const sizes = [
  { name: 'Extra Small', value: 'xs' as const },
  { name: 'Small', value: 'sm' as const },
  { name: 'Medium', value: 'md' as const },
  { name: 'Large', value: 'lg' as const },
  { name: 'Extra Large', value: 'xl' as const }
]

// 緩衝模式示例
const bufferDemo = ref({
  current: 45,
  buffer: 70
})

// 遊戲統計資料
const gameStats = ref({
  hp: 85,
  maxHp: 100,
  mp: 60,
  maxMp: 100,
  exp: 75,
  maxExp: 100
})

// 探索進度
const exploreProgress = ref(0)
const isExploring = ref(false)
let exploreInterval: number | null = null

const startExplore = () => {
  if (isExploring.value) return
  
  isExploring.value = true
  exploreProgress.value = 0
  
  exploreInterval = setInterval(() => {
    exploreProgress.value += 2
    if (exploreProgress.value >= 100) {
      isExploring.value = false
      exploreProgress.value = 100
      if (exploreInterval) {
        clearInterval(exploreInterval)
        exploreInterval = null
      }
      
      // 3秒後重置
      setTimeout(() => {
        exploreProgress.value = 0
      }, 3000)
    }
  }, 100)
}

// API 文檔資料
const apiProps = [
  { name: 'value', type: 'number', default: '0', description: '當前進度值' },
  { name: 'max', type: 'number', default: '100', description: '最大值' },
  { name: 'variant', type: 'string', default: 'default', description: '樣式變體' },
  { name: 'size', type: 'string', default: 'md', description: '尺寸大小' },
  { name: 'radius', type: 'string', default: 'full', description: '邊框圓角' },
  { name: 'label', type: 'string', default: '-', description: '標籤文字' },
  { name: 'showValue', type: 'boolean', default: 'false', description: '顯示百分比' },
  { name: 'animated', type: 'boolean', default: 'true', description: '動畫效果' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: '不確定狀態' },
  { name: 'bufferValue', type: 'number', default: '-', description: '緩衝值' },
  { name: 'segments', type: 'number[]', default: '-', description: '分段標記' },
  { name: 'animationDuration', type: 'number', default: '300', description: '動畫時長(ms)' }
]

// 清理計時器
onUnmounted(() => {
  if (exploreInterval) {
    clearInterval(exploreInterval)
  }
})

// 模擬緩衝進度
onMounted(() => {
  setInterval(() => {
    if (bufferDemo.value.buffer < 100) {
      bufferDemo.value.buffer = Math.min(bufferDemo.value.buffer + 1, 100)
    }
    if (bufferDemo.value.current < bufferDemo.value.buffer - 10) {
      bufferDemo.value.current = Math.min(bufferDemo.value.current + 0.5, bufferDemo.value.buffer - 5)
    }
  }, 200)
})
</script>