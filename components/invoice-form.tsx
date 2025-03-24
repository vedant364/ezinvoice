"use client"

import { useState } from "react"
import { PlusCircle, MinusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export function InvoiceForm() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: "AI Development Services", quantity: 1, unitPrice: 2500, amount: 2500 },
    { id: 2, description: "Cloud Infrastructure", quantity: 1, unitPrice: 750, amount: 750 },
  ])

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
    setItems([...items, { id: newId, description: "", quantity: 1, unitPrice: 0, amount: 0 }])
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate amount if quantity or unitPrice changes
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.09 // 9% tax rate
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber" className="text-white">
            Invoice Number
          </Label>
          <Input
            id="invoiceNumber"
            defaultValue="INV-2025-0042"
            className="bg-black border-green-800 text-white focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date" className="text-white">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            defaultValue="2025-03-24"
            className="bg-black border-green-800 text-white focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendor" className="text-white">
            Vendor
          </Label>
          <Input
            id="vendor"
            defaultValue="Tech Solutions Inc."
            className="bg-black border-green-800 text-white focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate" className="text-white">
            Due Date
          </Label>
          <Input
            id="dueDate"
            type="date"
            defaultValue="2025-04-23"
            className="bg-black border-green-800 text-white focus:border-green-500"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="billTo" className="text-white">
            Bill To
          </Label>
          <Input
            id="billTo"
            defaultValue="IVIS Labs"
            className="bg-black border-green-800 text-white focus:border-green-500"
          />
        </div>
      </div>

      <Separator className="bg-green-800" />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">Items</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-green-600 text-green-500 hover:bg-green-950"
            onClick={addItem}
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-2 text-sm text-gray-400 px-2">
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Unit Price</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-1"></div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-5">
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  className="bg-black border-green-800 text-white focus:border-green-500"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value))}
                  className="bg-black border-green-800 text-white focus:border-green-500"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, "unitPrice", Number.parseFloat(e.target.value))}
                  className="bg-black border-green-800 text-white focus:border-green-500"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.amount}
                  readOnly
                  className="bg-black border-green-800 text-white opacity-70"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-300 hover:bg-red-950"
                  onClick={() => removeItem(item.id)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-green-800" />

      <div className="space-y-2">
        <div className="flex justify-between text-white">
          <span>Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white">
          <span>Tax (9%)</span>
          <span>${calculateTax().toFixed(2)}</span>
        </div>
        <Separator className="bg-green-800 my-2" />
        <div className="flex justify-between text-white font-bold">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

