/**
 * 语音合成服务
 * 使用 Web Speech API 实现 TTS (Text-to-Speech)
 */

export interface SpeechConfig {
  voice?: string;      // 声音名称
  rate?: number;       // 语速 (0.1 - 10，默认0.9)
  pitch?: number;      // 音调 (0 - 2，默认1)
  volume?: number;     // 音量 (0 - 1，默认1)
  lang?: string;       // 语言 (默认 zh-CN)
}

export class SpeechService {
  private synthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private config: SpeechConfig = {
    rate: 0.9,           // 稍慢一点更清晰
    pitch: 1.05,         // 稍高一点更悦耳
    volume: 1,
    lang: 'zh-CN'
  };

  constructor() {
    this.synthesis = window.speechSynthesis;

    // 加载语音列表
    this.loadVoices();

    // 监听语音列表变化（某些浏览器需要）
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  /**
   * 加载语音列表
   */
  private loadVoices() {
    this.voices = this.synthesis.getVoices();
    console.log('可用语音列表:', this.voices.map(v => ({
      name: v.name,
      lang: v.lang,
      localService: v.localService
    })));
  }

  /**
   * 获取可用的语音列表
   */
  getVoices(): SpeechSynthesisVoice[] {
    // 如果还没加载，尝试重新获取
    if (this.voices.length === 0) {
      this.voices = this.synthesis.getVoices();
    }
    return this.voices;
  }

  /**
   * 获取中文语音
   */
  getChineseVoices(): SpeechSynthesisVoice[] {
    return this.getVoices().filter(voice =>
      voice.lang.includes('zh') || voice.lang.includes('CN')
    );
  }

  /**
   * 获取最佳中文语音
   * 优先级：
   * 1. Google 中文女声
   * 2. Microsoft 中文女声
   * 3. 本地中文女声
   * 4. 任何中文语音
   */
  getBestChineseVoice(): SpeechSynthesisVoice | null {
    const chineseVoices = this.getChineseVoices();

    if (chineseVoices.length === 0) return null;

    // 优先选择 Google 中文女声
    const googleVoice = chineseVoices.find(v =>
      v.name.includes('Google') &&
      (v.name.includes('女') || v.name.includes('Female') || v.name.includes('Ting'))
    );
    if (googleVoice) {
      console.log('使用 Google 中文语音:', googleVoice.name);
      return googleVoice;
    }

    // 其次选择 Microsoft 中文女声
    const microsoftVoice = chineseVoices.find(v =>
      v.name.includes('Microsoft') &&
      (v.name.includes('女') || v.name.includes('Xiaoxiao') || v.name.includes('Huihui'))
    );
    if (microsoftVoice) {
      console.log('使用 Microsoft 中文语音:', microsoftVoice.name);
      return microsoftVoice;
    }

    // 选择本地服务的女声
    const localFemaleVoice = chineseVoices.find(v =>
      v.localService && (v.name.includes('女') || v.name.includes('Female'))
    );
    if (localFemaleVoice) {
      console.log('使用本地中文女声:', localFemaleVoice.name);
      return localFemaleVoice;
    }

    // 选择任何女声
    const femaleVoice = chineseVoices.find(v =>
      v.name.includes('女') || v.name.includes('Female')
    );
    if (femaleVoice) {
      console.log('使用中文女声:', femaleVoice.name);
      return femaleVoice;
    }

    // 使用第一个中文语音
    console.log('使用默认中文语音:', chineseVoices[0].name);
    return chineseVoices[0];
  }

  /**
   * 设置配置
   */
  setConfig(config: Partial<SpeechConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * 朗读文本
   */
  speak(text: string, config?: Partial<SpeechConfig>): Promise<void> {
    return new Promise((resolve, reject) => {
      // 停止当前朗读
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      const finalConfig = { ...this.config, ...config };

      // 设置参数
      utterance.rate = finalConfig.rate || 0.9;
      utterance.pitch = finalConfig.pitch || 1.05;
      utterance.volume = finalConfig.volume || 1;
      utterance.lang = finalConfig.lang || 'zh-CN';

      // 设置声音
      if (finalConfig.voice) {
        const voices = this.getVoices();
        const voice = voices.find(v => v.name === finalConfig.voice);
        if (voice) {
          utterance.voice = voice;
          console.log('使用指定语音:', voice.name);
        }
      } else {
        // 自动选择最佳中文语音
        const bestVoice = this.getBestChineseVoice();
        if (bestVoice) {
          utterance.voice = bestVoice;
        }
      }

      // 事件监听
      utterance.onstart = () => {
        console.log('开始播报:', text.substring(0, 30) + '...');
      };

      utterance.onend = () => {
        console.log('播报结束');
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('播报错误:', event);
        this.currentUtterance = null;
        reject(event);
      };

      utterance.onpause = () => {
        console.log('播报暂停');
      };

      utterance.onresume = () => {
        console.log('播报继续');
      };

      this.currentUtterance = utterance;

      // 清空队列并开始播报
      this.synthesis.cancel();
      this.synthesis.speak(utterance);
    });
  }

  /**
   * 暂停朗读
   */
  pause() {
    if (this.synthesis.speaking) {
      this.synthesis.pause();
    }
  }

  /**
   * 继续朗读
   */
  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  /**
   * 停止朗读
   */
  stop() {
    this.synthesis.cancel();
    this.currentUtterance = null;
  }

  /**
   * 是否正在朗读
   */
  isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  /**
   * 是否暂停
   */
  isPaused(): boolean {
    return this.synthesis.paused;
  }
}

// 单例模式
let speechServiceInstance: SpeechService | null = null;

export function getSpeechService(): SpeechService {
  if (!speechServiceInstance) {
    speechServiceInstance = new SpeechService();
  }
  return speechServiceInstance;
}
