import Link from "next/link"
import { ArrowRight, FileText, CheckCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <header className="w-full py-6 px-4 md:px-6 bg-black border-b border-green-600">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-green-500" />
            <h1 className="text-2xl font-bold text-white">EzInvoice</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-white hover:text-green-400 transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-white hover:text-green-400 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-white hover:text-green-400 transition-colors">
              How It Works
            </Link>
            <Link href="/dashboard" className="text-white hover:text-green-400 transition-colors">
              Dashboard
            </Link>
          </nav>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black to-green-950">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                AI-Powered <span className="text-green-500">Invoice Processing</span> Made Simple
              </h1>
              <p className="text-lg text-gray-300">
                Transform handwritten invoices into structured data in seconds. Our AI-powered tool extracts, validates,
                and formats invoice data with unmatched accuracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/dashboard">
                    Process Invoices <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-500 hover:bg-green-950"
                >
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-green-600 shadow-lg shadow-green-900/20">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Invoice processing demonstration"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 md:px-6 bg-black">
          <div className="container mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Powerful <span className="text-green-500">Features</span>
              </h2>
              <p className="text-gray-300">
                Our AI-powered invoice processing tool offers a comprehensive set of features to streamline your
                workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-green-500" />,
                  title: "Handwritten Invoice Processing",
                  description:
                    "Process handwritten invoices with high accuracy using our advanced vision language models.",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-green-500" />,
                  title: "Auto-Populated Forms",
                  description:
                    "Extracted data automatically populates HTML forms, saving time and reducing manual entry errors.",
                },
                {
                  icon: <Download className="h-10 w-10 text-green-500" />,
                  title: "Structured JSON Export",
                  description: "Generate and download structured JSON files with all extracted invoice data.",
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-green-950 border-green-800 shadow-lg shadow-green-900/20">
                  <CardContent className="p-6 space-y-4">
                    <div className="bg-black p-3 rounded-full w-fit">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 md:px-6 bg-gradient-to-b from-green-950 to-black">
          <div className="container mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                How It <span className="text-green-500">Works</span>
              </h2>
              <p className="text-gray-300">Our streamlined process makes invoice processing simple and efficient.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Upload Invoice",
                  description: "Upload your handwritten or digital invoice through our intuitive interface.",
                },
                {
                  step: "02",
                  title: "AI Processing",
                  description: "Our AI analyzes the invoice and extracts all relevant data with high accuracy.",
                },
                {
                  step: "03",
                  title: "Validate & Edit",
                  description: "Review the extracted data, make any necessary corrections, and validate.",
                },
                {
                  step: "04",
                  title: "Export Data",
                  description: "Download the structured data in JSON format or integrate with your systems.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 space-y-4 h-full">
                    <div className="text-4xl font-bold text-green-500">{step.step}</div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-green-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/dashboard">
                  Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 md:px-6 bg-black border-t border-green-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold text-white">InvoiceAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 InvoiceAI. All rights reserved. Created for IVIS Labs Promptathon.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

