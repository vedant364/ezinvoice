"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Upload, ArrowLeft, Download, Save, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { InvoiceForm } from "@/components/invoice-form"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setFileName(files[0].name)
      // Simulate processing
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsProcessed(true)
        setActiveTab("review")
      }, 2000)
    }
  }

  const handleDownload = () => {
    // In a real app, this would generate and download the JSON file
    const dummyData = {
      invoiceNumber: "INV-2025-0042",
      date: "2025-03-24",
      dueDate: "2025-04-23",
      vendor: "Tech Solutions Inc.",
      billTo: "IVIS Labs",
      items: [
        { description: "AI Development Services", quantity: 1, unitPrice: 2500, amount: 2500 },
        { description: "Cloud Infrastructure", quantity: 1, unitPrice: 750, amount: 750 },
      ],
      subtotal: 3250,
      tax: 292.5,
      total: 3542.5,
    }

    const dataStr = JSON.stringify(dummyData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "invoice-data.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="w-full py-4 px-4 md:px-6 bg-black border-b border-green-600">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-500" />
              <h1 className="text-xl font-bold text-white">InvoiceAI</h1>
            </Link>
          </div>
          <Button variant="outline" asChild className="border-green-600 text-green-500 hover:bg-green-950">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Invoice Processing Dashboard</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-3 bg-green-950 border border-green-800">
              <TabsTrigger value="upload" className="data-[state=active]:bg-green-700 data-[state=active]:text-white">
                Upload
              </TabsTrigger>
              <TabsTrigger
                value="review"
                disabled={!isProcessed}
                className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
              >
                Review & Edit
              </TabsTrigger>
              <TabsTrigger
                value="export"
                disabled={!isProcessed}
                className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
              >
                Export
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <Card className="bg-green-950 border-green-800">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Upload Invoice</h2>
                  <p className="text-gray-300 mb-6">
                    Upload your handwritten or digital invoice. Our AI will process and extract all relevant data.
                  </p>

                  <FileUploader onFilesSelected={handleFileUpload} isProcessing={isProcessing} />

                  {fileName && !isProcessing && (
                    <div className="mt-4 p-3 bg-green-900/30 border border-green-800 rounded-md flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <span className="text-white">{fileName}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="review" className="space-y-6">
              <Card className="bg-green-950 border-green-800">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Review & Edit Extracted Data</h2>
                  <p className="text-gray-300 mb-6">
                    Our AI has extracted the following information from your invoice. Please review and make any
                    necessary corrections.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Original Invoice</h3>
                      <div className="border border-green-800 rounded-md overflow-hidden h-[400px] relative">
                        <img
                          src="/placeholder.svg?height=400&width=300"
                          alt="Original invoice"
                          className="object-cover w-full h-full"
                        />
                        <Button className="absolute top-2 right-2 bg-green-800 hover:bg-green-700">
                          <Eye className="h-4 w-4 mr-2" /> View Full
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Extracted Data</h3>
                      <InvoiceForm />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 gap-4">
                    <Button variant="outline" className="border-green-600 text-green-500 hover:bg-green-950">
                      Reset
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setActiveTab("export")}
                    >
                      <Save className="mr-2 h-4 w-4" /> Save & Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-6">
              <Card className="bg-green-950 border-green-800">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Export Processed Data</h2>
                  <p className="text-gray-300 mb-6">
                    Your invoice has been successfully processed. You can now download the structured data or integrate
                    it with your systems.
                  </p>

                  <div className="bg-black rounded-md p-4 border border-green-800 mb-6">
                    <pre className="text-green-400 overflow-auto max-h-[400px]">
                      {`{
  "invoiceNumber": "INV-2025-0042",
  "date": "2025-03-24",
  "dueDate": "2025-04-23",
  "vendor": "Tech Solutions Inc.",
  "billTo": "IVIS Labs",
  "items": [
    {
      "description": "AI Development Services",
      "quantity": 1,
      "unitPrice": 2500,
      "amount": 2500
    },
    {
      "description": "Cloud Infrastructure",
      "quantity": 1,
      "unitPrice": 750,
      "amount": 750
    }
  ],
  "subtotal": 3250,
  "tax": 292.5,
  "total": 3542.5
}`}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-green-900/20 border border-green-800">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Download className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Download JSON</h3>
                        <p className="text-gray-300 mb-4">
                          Download the structured data as a JSON file for your records or further processing.
                        </p>
                        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleDownload}>
                          <Download className="mr-2 h-4 w-4" /> Download JSON
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-900/20 border border-green-800">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <FileText className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Process Another Invoice</h3>
                        <p className="text-gray-300 mb-4">
                          Start over and process another invoice with our AI-powered tool.
                        </p>
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            setActiveTab("upload")
                            setIsProcessed(false)
                            setFileName("")
                          }}
                        >
                          <Upload className="mr-2 h-4 w-4" /> Upload New Invoice
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="py-6 px-4 md:px-6 bg-black border-t border-green-900 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              <span className="text-lg font-bold text-white">InvoiceAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 InvoiceAI. All rights reserved. Created for IVIS Labs Promptathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

