import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function FileTree({ items, selectedId, onSelect }) {
  const tree = useMemo(() => items, [items])

  return (
    <div className="p-2 sm:p-3 bg-black/60 h-full">
      <div className="text-sm mb-2 text-green-500">/root</div>
      <ul className="space-y-1">
        {tree.map((node) => {
          const isActive = selectedId === node.id
          return (
            <li key={node.id}>
              <button
                onClick={() => onSelect?.(node)}
                className={`w-full text-left px-2 py-2 border border-green-700/40 hover:bg-green-700/10 text-sm sm:text-base ${isActive ? 'bg-green-700/10 ring-1 ring-green-600' : ''}`}
              >
                <span className="text-green-500 mr-2">📁</span>
                {node.name ?? node.label ?? node.id}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


