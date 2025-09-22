<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-primary-100 mx-auto">
    <!-- 桌機版側邊欄布局 -->
    <div class="hidden lg:flex lg:h-screen">
      <!-- 左側導航 (桌機版) -->
      <div class="w-64 bg-white border-r border-gray-200 flex flex-col">
        <!-- 玩家狀態 (桌機版) -->
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">勇者 Lv.1</h2>
          <div class="space-y-3">
            <div class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-health font-medium">HP</span>
                <span class="text-gray-600">100/100</span>
              </div>
              <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div class="progress-health" style="width: 100%"></div>
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-experience font-medium">EXP</span>
                <span class="text-gray-600">30/100</span>
              </div>
              <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div class="progress-experience" style="width: 30%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 導航選單 (桌機版) -->
        <nav class="flex-1 p-4">
          <div class="space-y-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="[
                'w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200',
                currentTab === tab.id
                  ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              ]"
              @click="currentTab = tab.id"
            >
              {{ tab.name }}
            </button>
          </div>
        </nav>
      </div>

      <!-- 主要內容區 (桌機版) -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 p-8 overflow-y-auto">
          <!-- 桌機版內容區域 -->
          <div class="max-w-4xl mx-auto">
            <!-- 探索區域 (桌機版) -->
            <div v-if="currentTab === 'explore'" class="space-y-8">
              <h3 class="text-3xl font-bold text-gray-800">森林探索</h3>

              <div class="grid lg:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <!-- 探索進度區域 -->
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 class="text-lg font-semibold mb-4">探索進度</h4>
                    <div class="space-y-3">
                      <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          class="progress-explore transition-all duration-300"
                          :style="{ width: exploreProgress + '%' }"
                        ></div>
                      </div>
                      <p class="text-gray-600">進度: {{ Math.round(exploreProgress) }}%</p>

                      <!-- 探索狀態文字 -->
                      <p v-if="isExploring" class="text-primary-600 font-medium">
                        {{ exploreStatusText }}
                      </p>
                    </div>
                  </div>

                  <!-- 開始探索按鈕 -->
                  <button
                    :disabled="isExploring"
                    @click="startExplore"
                    :class="[
                      'w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform',
                      isExploring
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'text-white bg-primary-500 hover:bg-primary-600 hover:-translate-y-1'
                    ]"
                  >
                    {{ isExploring ? '探索中...' : '開始探索' }}
                  </button>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 class="text-lg font-semibold mb-4">區域資訊</h4>
                  <div class="space-y-2 text-sm text-gray-600">
                    <p>推薦等級: Lv.1</p>
                    <p>探索時間: {{ exploreDuration / 1000 }}秒</p>
                    <p>經驗值獎勵: 20 EXP</p>
                    <p>可能獲得: 木材、草藥</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 背包區域 (桌機版) -->
            <div v-if="currentTab === 'inventory'" class="space-y-8">
              <h3 class="text-3xl font-bold text-gray-800">背包</h3>

              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div class="bg-white p-6 rounded-xl border-2 border-rarity-common text-center">
                  <div class="text-2xl mb-2">🪵</div>
                  <div class="font-medium text-rarity-common">木材</div>
                  <div class="text-sm text-gray-500">x5</div>
                </div>
                <div class="bg-white p-6 rounded-xl border-2 border-rarity-common text-center">
                  <div class="text-2xl mb-2">🪨</div>
                  <div class="font-medium text-rarity-common">石頭</div>
                  <div class="text-sm text-gray-500">x3</div>
                </div>
                <div class="bg-white p-6 rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-400">
                  <div class="text-2xl mb-2">➕</div>
                  <div class="font-medium">空</div>
                </div>
                <div class="bg-white p-6 rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-400">
                  <div class="text-2xl mb-2">➕</div>
                  <div class="font-medium">空</div>
                </div>
              </div>
            </div>

            <!-- 製作區域 -->
            <div v-if="currentTab === 'craft'" class="space-y-8">
              <h3 class="text-3xl font-bold text-gray-800">製作</h3>
              <div class="text-center text-gray-500 py-12">
                <p class="text-xl">製作功能開發中...</p>
              </div>
            </div>

            <!-- 戰鬥區域 -->
            <div v-if="currentTab === 'battle'" class="space-y-8">
              <h3 class="text-3xl font-bold text-gray-800">戰鬥</h3>
              <div class="text-center text-gray-500 py-12">
                <p class="text-xl">戰鬥功能開發中...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機/平板版布局 -->
    <div class="lg:hidden flex flex-col min-h-screen">
      <!-- 玩家狀態條 (手機/平板版) -->
      <div class="bg-white p-4 md:p-6 shadow-md border-b border-gray-200">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">勇者 Lv.1</h2>
          <div class="grid md:grid-cols-2 gap-3 md:gap-6">
            <!-- HP Bar -->
            <div class="space-y-1">
              <div class="flex justify-between text-sm md:text-base">
                <span class="text-health font-medium">HP</span>
                <span class="text-gray-600">100/100</span>
              </div>
              <div class="h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="progress-health" style="width: 100%"></div>
              </div>
            </div>
            <!-- EXP Bar -->
            <div class="space-y-1">
              <div class="flex justify-between text-sm md:text-base">
                <span class="text-experience font-medium">EXP</span>
                <span class="text-gray-600">30/100</span>
              </div>
              <div class="h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="progress-experience" style="width: 30%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要操作區 (手機/平板版) -->
      <div class="flex-1 p-4 md:p-8 overflow-y-auto">
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- 探索區域 (手機/平板版) -->
          <div v-if="currentTab === 'explore'" class="space-y-6">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 text-center">森林探索</h3>

            <!-- 平板橫向時顯示更多資訊 -->
            <div class="md:grid md:grid-cols-2 md:gap-8 space-y-6 md:space-y-0">
              <div class="space-y-4">
                <div class="w-full h-6 md:h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="progress-explore transition-all duration-300"
                    :style="{ width: exploreProgress + '%' }"
                  ></div>
                </div>
                <p class="text-center text-gray-600 text-sm md:text-base">
                  探索進度: {{ Math.round(exploreProgress) }}%
                </p>

                <!-- 探索狀態文字 (手機版) -->
                <p v-if="isExploring" class="text-center text-primary-600 font-medium text-sm md:text-base">
                  {{ exploreStatusText }}
                </p>

                <button
                  :disabled="isExploring"
                  @click="startExplore"
                  :class="[
                    'w-full py-3 md:py-4 text-lg md:text-xl font-semibold rounded-xl transition-all duration-200 transform active:translate-y-0',
                    isExploring
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'text-white bg-primary-500 hover:bg-primary-600 hover:-translate-y-0.5'
                  ]"
                >
                  {{ isExploring ? '探索中...' : '開始探索' }}
                </button>
              </div>

              <!-- 平板版額外資訊 -->
              <div class="hidden md:block bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h4 class="font-semibold mb-3">區域資訊</h4>
                <div class="space-y-2 text-sm text-gray-600">
                  <p>推薦等級: Lv.1</p>
                  <p>探索時間: {{ exploreDuration / 1000 }}秒</p>
                  <p>經驗值獎勵: 20 EXP</p>
                  <p>可能獲得: 木材、草藥</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 背包區域 (手機/平板版) -->
          <div v-if="currentTab === 'inventory'" class="space-y-6">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 text-center">背包</h3>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div class="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border-2 border-rarity-common text-center">
                <div class="text-xl md:text-2xl mb-2">🪵</div>
                <div class="text-sm md:text-base font-medium text-rarity-common">木材</div>
                <div class="text-xs md:text-sm text-gray-500">x5</div>
              </div>
              <div class="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border-2 border-rarity-common text-center">
                <div class="text-xl md:text-2xl mb-2">🪨</div>
                <div class="text-sm md:text-base font-medium text-rarity-common">石頭</div>
                <div class="text-xs md:text-sm text-gray-500">x3</div>
              </div>
              <div class="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-400 font-medium">
                <div class="text-xl md:text-2xl mb-2">➕</div>
                <div class="text-sm md:text-base">空</div>
              </div>
              <div class="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-400 font-medium">
                <div class="text-xl md:text-2xl mb-2">➕</div>
                <div class="text-sm md:text-base">空</div>
              </div>
            </div>
          </div>

          <!-- 製作區域 (手機/平板版) -->
          <div v-if="currentTab === 'craft'" class="space-y-6">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 text-center">製作</h3>
            <div class="text-center text-gray-500 py-8 md:py-12">
              <p class="text-lg md:text-xl">製作功能開發中...</p>
            </div>
          </div>

          <!-- 戰鬥區域 (手機/平板版) -->
          <div v-if="currentTab === 'battle'" class="space-y-6">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 text-center">戰鬥</h3>
            <div class="text-center text-gray-500 py-8 md:py-12">
              <p class="text-lg md:text-xl">戰鬥功能開發中...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 導航 (手機/平板版) -->
      <div class="flex bg-white border-t border-gray-200 shadow-lg">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'flex-1 py-4 px-2 font-medium transition-all duration-200 text-sm md:text-base',
            currentTab === tab.id
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          ]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const currentTab = ref('explore')

const tabs = [
  { id: 'explore', name: '探索' },
  { id: 'inventory', name: '背包' },
  { id: 'craft', name: '製作' },
  { id: 'battle', name: '戰鬥' }
]

// 探索進度相關
const isExploring = ref(false)
const exploreProgress = ref(0)
const exploreDuration = ref(10000) // 10秒，單位是毫秒
const exploreStatusText = ref('')

let exploreTimer: number | null = null

// 開始探索功能
const startExplore = () => {
  if (isExploring.value) return

  // 重置狀態
  isExploring.value = true
  exploreProgress.value = 0
  exploreStatusText.value = '踏入森林深處...'

  const startTime = Date.now()
  const updateInterval = 100 // 每100毫秒更新一次，比較流暢

  exploreTimer = setInterval(() => {
    const elapsed = Date.now() - startTime
    const progress = Math.min((elapsed / exploreDuration.value) * 100, 100)

    exploreProgress.value = progress

    // 根據進度更新狀態文字
    if (progress < 25) {
      exploreStatusText.value = '踏入森林深處...'
    } else if (progress < 50) {
      exploreStatusText.value = '發現了一些痕跡...'
    } else if (progress < 75) {
      exploreStatusText.value = '正在仔細搜尋...'
    } else if (progress < 100) {
      exploreStatusText.value = '準備返回...'
    }

    // 探索完成
    if (progress >= 100) {
      completeExplore()
    }
  }, updateInterval)
}

// 完成探索
const completeExplore = () => {
  if (exploreTimer) {
    clearInterval(exploreTimer)
    exploreTimer = null
  }

  isExploring.value = false
  exploreProgress.value = 100
  exploreStatusText.value = '探索完成！獲得了一些物品'

  // 這裡之後可以加上獲得獎勵的邏輯
  console.log('探索完成！獲得經驗值和物品')

  // 3秒後清除完成訊息
  setTimeout(() => {
    if (!isExploring.value) {
      exploreProgress.value = 0
      exploreStatusText.value = ''
    }
  }, 3000)
}

// 組件卸載時清理計時器
onUnmounted(() => {
  if (exploreTimer) {
    clearInterval(exploreTimer)
  }
})
</script>
