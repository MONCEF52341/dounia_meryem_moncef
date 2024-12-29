'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useData } from '@/hooks/useData'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Student = {
  id: number
  firstname: string
  lastname: string
}

export default function StudentManager() {
  const { data, loading, error } = useData()
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const { register, handleSubmit, reset } = useForm<Student>()
  const { toast } = useToast()

  const students = [...new Map(data.map(item => [item.student.id, item.student])).values()]

  const onSubmit = (formData: Student) => {
    if (editingStudent) {
      // Update logic would go here
      setEditingStudent(null)
      toast({ title: "Étudiant modifié avec succès" })
    } else {
      // Add logic would go here
      toast({ title: "Étudiant ajouté avec succès" })
    }
    reset()
  }

  const editStudent = (student: Student) => {
    setEditingStudent(student)
    reset(student)
  }

  const deleteStudent = (id: number) => {
    // Delete logic would go here
    toast({ title: "Étudiant supprimé avec succès" })
  }

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error.message}</div>

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <Input {...register('firstname')} placeholder="Prénom" required />
        <Input {...register('lastname')} placeholder="Nom" required />
        <Button type="submit">{editingStudent ? 'Modifier' : 'Ajouter'} l'étudiant</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map(student => (
            <motion.tr
              key={student.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.01 }}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.firstname}</TableCell>
              <TableCell>{student.lastname}</TableCell>
              <TableCell>
                <Button onClick={() => editStudent(student)} className="mr-2 hover:scale-105 transition-transform">Modifier</Button>
                <Button onClick={() => deleteStudent(student.id)} variant="destructive" className="hover:scale-105 transition-transform">Supprimer</Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

