'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatPanel } from './chat-panel';
import { ArtifactPanel } from './artifact-panel';
import { useAssistantStream } from '../hooks/use-assistant-stream';

export function AiWorkspace() {
  const {
    messages,
    artifacts,
    activeArtifact,
    activeArtifactId,
    status,
    error,
    sendMessage,
    stop,
    selectArtifact,
    closeArtifact
  } = useAssistantStream();
  const shouldReduceMotion = useReducedMotion();
  const [mobileTab, setMobileTab] = useState('chat');
  const hasArtifact = !!activeArtifact;

  useEffect(() => {
    if (activeArtifactId) {
      setMobileTab('results');
    }
  }, [activeArtifactId]);

  const renderChatPanel = () => (
    <ChatPanel
      messages={messages}
      status={status}
      error={error}
      hasArtifact={hasArtifact}
      onSend={sendMessage}
      onStop={stop}
    />
  );

  const artifactSwitcher =
    artifacts.length > 1 ? (
      <div className='mb-3 flex flex-wrap gap-2'>
        {artifacts.map((artifact) => (
          <Button
            key={artifact.id}
            type='button'
            variant={artifact.id === activeArtifactId ? 'default' : 'outline'}
            size='sm'
            className='h-8 max-w-64 justify-start'
            onClick={() => selectArtifact(artifact.id)}
          >
            <span className='truncate'>{artifact.title}</span>
          </Button>
        ))}
      </div>
    ) : null;

  return (
    <div className='min-h-[calc(100dvh-2rem)] min-w-0'>
      <div className='md:hidden'>
        {hasArtifact ? (
          <Tabs value={mobileTab} onValueChange={setMobileTab} className='gap-3'>
            <div className='flex items-center justify-between gap-3'>
              <TabsList>
                <TabsTrigger value='chat'>대화</TabsTrigger>
                <TabsTrigger value='results'>
                  결과
                  <Badge variant='secondary' className='ml-1.5'>
                    {artifacts.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='chat'>{renderChatPanel()}</TabsContent>
            <TabsContent value='results'>
              {artifactSwitcher}
              {activeArtifact && (
                <ArtifactPanel artifact={activeArtifact} onClose={closeArtifact} />
              )}
            </TabsContent>
          </Tabs>
        ) : (
          renderChatPanel()
        )}
      </div>

      <motion.div
        layout
        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
        className={
          hasArtifact
            ? 'hidden min-h-0 gap-0 md:grid md:grid-cols-[minmax(420px,500px)_minmax(0,1fr)]'
            : 'hidden md:block'
        }
      >
        <motion.div layout className='min-w-0 pr-4'>
          {renderChatPanel()}
        </motion.div>
        <AnimatePresence>
          {activeArtifact && (
            <motion.div
              key={activeArtifact.id}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 28, scale: 0.985 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20, scale: 0.985 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className='border-border/70 min-w-0 border-l pl-4'
            >
              {artifactSwitcher}
              <ArtifactPanel
                artifact={activeArtifact}
                onClose={closeArtifact}
                className='md:h-[calc(100dvh-2rem)]'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
