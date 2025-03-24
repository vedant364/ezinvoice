"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  isProcessing: boolean
}

export function FileUploader({ onFilesSelected, isProcessing }: FileUploaderProps) {
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles)

      // Simulate upload progress
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(currentProgress)

        if (currentProgress >= 100) {
          clearInterval(interval)
        }
      }, 200)
    },
    [onFilesSelected],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".tiff"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: isProcessing,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-green-500 bg-green-500/10"
            : "border-green-800 hover:border-green-600 hover:bg-green-900/20"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 bg-green-900/30 rounded-full">
            <Upload className="h-8 w-8 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-white font-medium">
              {isDragActive ? "Drop the file here" : "Drag & drop your invoice here"}
            </p>
            <p className="text-gray-400 text-sm">Supports JPG, PNG, GIF, and PDF files</p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-green-600 text-green-500 hover:bg-green-950"
            disabled={isProcessing}
          >
            Browse Files
          </Button>
        </div>
      </div>

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Processing invoice...</span>
            <span className="text-sm text-gray-300">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-green-950">
            <div className="h-full bg-green-600 rounded-full" />
          </Progress>
          <div className="flex items-center justify-center text-green-500 gap-2 mt-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">AI is extracting data from your invoice</span>
          </div>
        </div>
      )}
    </div>
  )
}

