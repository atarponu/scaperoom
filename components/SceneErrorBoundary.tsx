'use client'

import React from 'react'

interface State { error: Error | null }

export class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode; sceneId: string },
  State
> {
  constructor(props: { children: React.ReactNode; sceneId: string }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('[SceneErrorBoundary] scene render failed:', error)
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[SceneErrorBoundary] scene:', this.props.sceneId, error, info)
  }

  componentDidUpdate(prev: { sceneId: string }) {
    if (prev.sceneId !== this.props.sceneId && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="absolute inset-0 flex items-end pb-24 px-8 md:px-16">
          <div className="w-full max-w-xl border-l-2 border-parchment-dim/20 pl-4">
            <p className="font-narrative text-lg text-parchment">
              The moment passes in silence.
            </p>
            <p className="mt-4 font-title text-xs uppercase tracking-widest text-parchment-dim/40">
              [Click anywhere to continue]
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
