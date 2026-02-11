'use client'

import { authConfig, getAuthUrls, getAuthEnvironmentInfo } from '@/lib/auth.config'
import { useState, useEffect } from 'react'

export function AuthDebug() {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const authUrls = getAuthUrls()
  const envInfo = getAuthEnvironmentInfo()

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Authentication Configuration
      </h2>

      <div className="grid gap-4 mb-6">
        {/* Base URL */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <label className="text-sm font-medium text-slate-700">Base URL</label>
          <div className="flex items-center gap-2 mt-2">
            <code className="flex-1 bg-slate-100 p-2 rounded text-sm text-slate-900 font-mono break-all">
              {authUrls.baseUrl}
            </code>
            <button
              onClick={() => copyToClipboard(authUrls.baseUrl, 'baseUrl')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                copied === 'baseUrl'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {copied === 'baseUrl' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Login URL */}
        <div className="bg-white border border-blue-200 rounded p-4 bg-blue-50">
          <label className="text-sm font-medium text-blue-900">Login URL</label>
          <div className="flex items-center gap-2 mt-2">
            <code className="flex-1 bg-blue-100 p-2 rounded text-sm text-blue-900 font-mono break-all">
              {authUrls.login}
            </code>
            <button
              onClick={() => copyToClipboard(authUrls.login, 'login')}
              className={`px-3 py-1 rounded text-sm font-medium transition whitespace-nowrap ${
                copied === 'login'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {copied === 'login' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <a
            href={authUrls.login}
            className="inline-block mt-2 text-blue-600 hover:text-blue-700 underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in browser →
          </a>
        </div>

        {/* Signup URL */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <label className="text-sm font-medium text-slate-700">Signup URL</label>
          <div className="flex items-center gap-2 mt-2">
            <code className="flex-1 bg-slate-100 p-2 rounded text-sm text-slate-900 font-mono break-all">
              {authUrls.signup}
            </code>
            <button
              onClick={() => copyToClipboard(authUrls.signup, 'signup')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                copied === 'signup'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {copied === 'signup' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <label className="text-sm font-medium text-slate-700">Environment</label>
          <p className="mt-2 text-sm text-slate-700 font-mono">{authConfig.environment}</p>
        </div>

        {/* Debug Info */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <label className="text-sm font-medium text-slate-700">Debug Info</label>
          <p className="mt-2 text-sm text-slate-700 font-mono">{envInfo}</p>
        </div>
      </div>

      {/* Full Config */}
      <details className="bg-white border border-slate-200 rounded p-4">
        <summary className="cursor-pointer font-medium text-slate-900">
          Full Configuration (JSON)
        </summary>
        <pre className="mt-3 bg-slate-100 p-3 rounded overflow-x-auto text-xs text-slate-900">
          {JSON.stringify(authConfig, null, 2)}
        </pre>
      </details>
    </div>
  )
}
