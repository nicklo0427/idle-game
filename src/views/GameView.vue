<!-- src/views/GameView.vue -->
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
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 class="text-lg font-semibold mb-4">探索進度</h4>
                    <div class="space-y-3">
                      <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div class="progress-explore" style="width: 45%"></div>
                      </div>
                      <p class="text-gray-600">進度: 45%</p>
                    </div>
                  </div>

                  <button class="w-full py-4 text-lg font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-all duration-200 transform hover:-translate-y-1">
                    開始探索
                  </button>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 class="text-lg font-semibold mb-4">區域資訊</h4>
                  <div class="space-y-2 text-sm text-gray-600">
                    <p>推薦等級: Lv.1</p>
                    <p>探索時間: 10秒</p>
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
                  <div class="progress-explore" style="width: 45%"></div>
                </div>
                <p class="text-center text-gray-600 text-sm md:text-base">探索進度: 45%</p>

                <button class="w-full py-3 md:py-4 text-lg md:text-xl font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                  開始探索
                </button>
              </div>

              <!-- 平板版額外資訊 -->
              <div class="hidden md:block bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h4 class="font-semibold mb-3">區域資訊</h4>
                <div class="space-y-2 text-sm text-gray-600">
                  <p>推薦等級: Lv.1</p>
                  <p>探索時間: 10秒</p>
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
import { ref } from 'vue'

const currentTab = ref('explore')

const tabs = [
  { id: 'explore', name: '探索' },
  { id: 'inventory', name: '背包' },
  { id: 'craft', name: '製作' },
  { id: 'battle', name: '戰鬥' }
]
</script>
