"use client"

import React, { useState } from "react"
import { Moon, Sun, Edit, Trash } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link';

const STATUS_COLORS = {
  "done": "#4ade80",         // Green
  "in progress": "#facc15",  // Yellow
  "incomplete": "#f87171",   // Red
}

export default function ToDo() {
  const { setTheme } = useTheme()

  const [todos, setTodos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("incomplete")

  const addTodo = () => {
    if (!title.trim()) return
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status,
    }
    setTodos([...todos, newTodo])
    setTitle("")
    setDescription("")
    setStatus("incomplete")
    setShowForm(false)
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id) => {
    const updatedTodo = todos.find(todo => todo.id === id)
    setTitle(updatedTodo.title)
    setDescription(updatedTodo.description)
    setStatus(updatedTodo.status)
    setTodos(todos.filter(todo => todo.id !== id))  // Removing the old todo from the list for editing
    setShowForm(true)
  }

  const exportCSV = () => {
    const headers = ["Title", "Description", "Status"]
    const rows = todos.map((todo) => [todo.title, todo.description, todo.status])
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "todo_stats.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const chartData = Object.entries(
    todos.reduce((acc, todo) => {
      acc[todo.status] = (acc[todo.status] || 0) + 1
      return acc
    }, {})
  ).map(([status, count]) => ({ name: status, value: count }))

  return (
    <div className="flex justify-center items-center text-center h-full min-h-screen bg-white dark:bg-gray-900">
      <div className="bg-[#AFDEDC] rounded-xl w-[90%] md:w-[80%] h-fit py-6 px-4 my-10 overflow-y-auto">
        {/* Header */}
        <div className="w-full py-4 bg-[#91A8A4] rounded-t-xl flex justify-between items-center px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="font-bold text-xl">Todo App</div>
          <div className="flex flex-col">
            <div className="text-sm">Hello There!</div>
            <Link href={"/"} className="bg-[#C4D7F2] px-2 py-1 rounded-md mt-2 ">Logout</Link>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="my-4">
          <Button onClick={() => setShowForm(!showForm)} className="mb-4">
            {showForm ? "Cancel" : "Add Todo"}
          </Button>

          <AnimatePresence>
            {showForm && (
              <motion.div
                className="flex flex-col gap-3 p-4 border border-gray-400 rounded-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 rounded border border-gray-300 dark:text-black "
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 rounded border border-gray-300 dark:text-black "
                />
                <Button onClick={addTodo}>Save Todo</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-gray-700">No Todos Here</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 rounded-lg border shadow-md bg-white dark:bg-gray-800 text-left transition-all hover:shadow-xl`}
              >
                <h3 className="font-bold text-lg">{todo.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{todo.description}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span
                    className={`px-4 py-2 rounded-md ${
                      todo.status === "done"
                        ? "bg-green-300"
                        : todo.status === "in progress"
                        ? "bg-yellow-300"
                        : "bg-red-300"
                    }`}
                  >
                    {todo.status}
                  </span>

                  {/* Dropdown for selecting status */}
                  <select
                    value={todo.status}
                    onChange={(e) => {
                      const newStatus = e.target.value
                      setTodos(todos.map((t) =>
                        t.id === todo.id ? { ...t, status: newStatus } : t
                      ))
                    }}
                    className="p-1 rounded  border text-sm"
                  >
                    <option className="dark:text-black" value="incomplete">Incomplete</option>
                    <option className="dark:text-black" value="in progress">In Progress</option>
                    <option className="dark:text-black" value="done">Done</option>
                  </select>

                  <Button size="sm" variant="destructive" onClick={() => deleteTodo(todo.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => editTodo(todo.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chart Section */}
        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Task Progress Overview</h2>
              <Button variant="outline" size="sm" onClick={exportCSV}>
                Export CSV
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  )
}
