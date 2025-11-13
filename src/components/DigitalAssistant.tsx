import React, { useState, useEffect, useRef } from 'react';
import { Button, Select, Tooltip, message, Slider, Collapse } from 'antd';
import {
  SoundOutlined,
  PauseOutlined,
  CloseOutlined,
  MinusOutlined,
  ExpandOutlined,
  CustomerServiceOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Panel } = Collapse;
import type { VillageStatistics } from '../types';
import { getSpeechService } from '../services/speechService';
import type { NarratorScript } from '../services/narratorScripts';
import {
  getAllScripts,
  getFullTourScript,
  getWelcomeScript
} from '../services/narratorScripts';
import './DigitalAssistant.css';

interface DigitalAssistantProps {
  statistics: VillageStatistics;
  autoPlay?: boolean; // 是否自动播放欢迎词
}

const DigitalAssistant: React.FC<DigitalAssistantProps> = ({
  statistics,
  autoPlay = false
}) => {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentScript, setCurrentScript] = useState<NarratorScript | null>(null);
  const [scripts, setScripts] = useState<NarratorScript[]>([]);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.05);

  const speechService = useRef(getSpeechService());
  const hasPlayedWelcome = useRef(false);

  // 初始化语音列表
  useEffect(() => {
    // 加载语音列表
    const loadVoices = () => {
      const voices = speechService.current.getChineseVoices();
      setAvailableVoices(voices);

      // 获取最佳语音并设置为默认
      const bestVoice = speechService.current.getBestChineseVoice();
      if (bestVoice) {
        setSelectedVoice(bestVoice.name);
      }
    };

    // 立即加载
    loadVoices();

    // 监听语音列表变化
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // 初始化脚本列表
  useEffect(() => {
    if (statistics) {
      const allScripts = getAllScripts(statistics);
      setScripts(allScripts);

      // 自动播放欢迎词（仅一次）
      if (autoPlay && !hasPlayedWelcome.current) {
        hasPlayedWelcome.current = true;
        setTimeout(() => {
          setVisible(true);
          handleSpeak(getWelcomeScript());
        }, 2000);
      }
    }
  }, [statistics, autoPlay]);

  // 播放脚本
  const handleSpeak = async (script: NarratorScript) => {
    try {
      setCurrentScript(script);
      setSpeaking(true);
      setPaused(false);

      // 使用当前设置的语音参数
      await speechService.current.speak(script.content, {
        voice: selectedVoice,
        rate,
        pitch
      });

      // 播放完成
      setSpeaking(false);
      setCurrentScript(null);
    } catch (error) {
      console.error('语音播报失败:', error);
      message.error('语音播报失败，请检查浏览器权限');
      setSpeaking(false);
      setCurrentScript(null);
    }
  };

  // 暂停/继续
  const handlePauseResume = () => {
    if (paused) {
      speechService.current.resume();
      setPaused(false);
    } else {
      speechService.current.pause();
      setPaused(true);
    }
  };

  // 停止
  const handleStop = () => {
    speechService.current.stop();
    setSpeaking(false);
    setPaused(false);
    setCurrentScript(null);
  };

  // 完整导览
  const handleFullTour = () => {
    const fullScript = getFullTourScript(statistics);
    handleSpeak(fullScript);
  };

  // 显示/隐藏
  const toggleVisible = () => {
    if (visible) {
      handleStop(); // 隐藏时停止播报
    }
    setVisible(!visible);
    setMinimized(false);
  };

  // 最小化/展开
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  // 悬浮按钮
  if (!visible) {
    return (
      <Tooltip title="数字助手" placement="left">
        <div className="digital-assistant-fab" onClick={toggleVisible}>
          <CustomerServiceOutlined />
        </div>
      </Tooltip>
    );
  }

  // 主窗口
  return (
    <div className={`digital-assistant ${minimized ? 'minimized' : ''}`}>
      {/* 头部 */}
      <div className="assistant-header">
        <div className="assistant-title">
          <CustomerServiceOutlined />
          <span>数字助手</span>
          {speaking && (
            <span className="speaking-indicator">
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
            </span>
          )}
        </div>
        <div className="assistant-controls">
          <Button
            type="text"
            size="small"
            icon={<MinusOutlined />}
            onClick={toggleMinimized}
          />
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={toggleVisible}
          />
        </div>
      </div>

      {/* 内容区 */}
      {!minimized && (
        <div className="assistant-content">
          {/* 数字人形象 */}
          <div className="assistant-avatar">
            <div className={`avatar-circle ${speaking ? 'speaking' : ''}`}>
              <CustomerServiceOutlined />
            </div>
            {currentScript && (
              <div className="current-script">
                <div className="script-title">{currentScript.title}</div>
                <div className="script-text">{currentScript.content}</div>
              </div>
            )}
          </div>

          {/* 控制面板 */}
          <div className="assistant-panel">
            {/* 脚本选择 */}
            <div className="script-selector">
              <Select
                style={{ width: '100%' }}
                placeholder="选择播报内容"
                onChange={(value) => {
                  const script = scripts.find(s => s.id === value);
                  if (script) handleSpeak(script);
                }}
                value={currentScript?.id}
                disabled={speaking}
              >
                {scripts.map(script => (
                  <Select.Option key={script.id} value={script.id}>
                    {script.title}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* 播放控制 */}
            <div className="playback-controls">
              {speaking ? (
                <>
                  <Button
                    type="primary"
                    icon={paused ? <SoundOutlined /> : <PauseOutlined />}
                    onClick={handlePauseResume}
                  >
                    {paused ? '继续' : '暂停'}
                  </Button>
                  <Button onClick={handleStop}>停止</Button>
                </>
              ) : (
                <Button
                  type="primary"
                  icon={<SoundOutlined />}
                  onClick={handleFullTour}
                  block
                >
                  完整导览
                </Button>
              )}
            </div>

            {/* 语音设置 */}
            <Collapse ghost>
              <Panel header="⚙️ 语音设置" key="settings">
                <div className="voice-settings">
                  {/* 语音选择 */}
                  <div className="setting-item">
                    <label>语音引擎：</label>
                    <Select
                      style={{ width: '100%' }}
                      value={selectedVoice}
                      onChange={setSelectedVoice}
                      disabled={speaking}
                    >
                      {availableVoices.map(voice => (
                        <Select.Option key={voice.name} value={voice.name}>
                          {voice.name} {voice.localService ? '(本地)' : ''}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>

                  {/* 语速 */}
                  <div className="setting-item">
                    <label>语速：{rate.toFixed(1)}</label>
                    <Slider
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={rate}
                      onChange={setRate}
                      disabled={speaking}
                    />
                  </div>

                  {/* 音调 */}
                  <div className="setting-item">
                    <label>音调：{pitch.toFixed(2)}</label>
                    <Slider
                      min={0.5}
                      max={2}
                      step={0.05}
                      value={pitch}
                      onChange={setPitch}
                      disabled={speaking}
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>

            {/* 提示信息 */}
            <div className="assistant-tips">
              {speaking
                ? '正在播报中...'
                : '选择播报内容或点击"完整导览"开始'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalAssistant;
