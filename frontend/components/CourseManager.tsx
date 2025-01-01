'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useData } from '@/hooks/useData'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Course = {
  id: number
  name: string
}

export default function CourseManager() {
  const { data, loading, error } = useData()
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const { register, handleSubmit, reset } = useForm<Course>()
  const { toast } = useToast()

  const courses = [...new Set(data.map(item => item.course))]
    .map((course, index) => ({ id: index + 1, name: course }))

  const onSubmit = (formData: Course) => {
    if (editingCourse) {
      // Update logic would go here
      setEditingCourse(null)
      toast({ title: "Cours modifié avec succès" })
    } else {
      // Add logic would go here
      toast({ title: "Cours ajouté avec succès" })
    }
    reset()
  }

  const editCourse = (course: Course) => {
    setEditingCourse(course)
    reset(course)
  }

  const deleteCourse = (id: number) => {
    // Delete logic would go here
    toast({ title: "Cours supprimé avec succès" })
  }

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error.message}</div>

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <Input {...register('name')} placeholder="Nom du cours" required />
        <Button type="submit">{editingCourse ? 'Modifier' : 'Ajouter'} le cours</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom du cours</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map(course => (
            <motion.tr
              key={course.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.01 }}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>
                <Button onClick={() => editCourse(course)} className="mr-2 hover:scale-105 transition-transform">Modifier</Button>
                <Button onClick={() => deleteCourse(course.id)} variant="destructive" className="hover:scale-105 transition-transform">Supprimer</Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

