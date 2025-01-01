'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useData } from '@/hooks/useData'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Grade = {
  unique_id: number
  course: string
  student: {
    firstname: string
    lastname: string
    id: number
  }
  date: string
  grade: number
}

export default function GradeManager() {
  const { data, loading, error } = useData()
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null)
  const { register, handleSubmit, reset } = useForm<Grade>()
  const { toast } = useToast()

  const onSubmit = (formData: Grade) => {
    if (editingGrade) {
      // Update logic would go here
      setEditingGrade(null)
      toast({ title: "Note modifiée avec succès" })
    } else {
      // Add logic would go here
      toast({ title: "Note ajoutée avec succès" })
    }
    reset()
  }

  const editGrade = (grade: Grade) => {
    setEditingGrade(grade)
    reset(grade)
  }

  const deleteGrade = (id: number) => {
    // Delete logic would go here
    toast({ title: "Note supprimée avec succès" })
  }

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error.message}</div>

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <Input {...register('course')} placeholder="Cours" required />
        <Input {...register('student.firstname')} placeholder="Prénom de l'étudiant" required />
        <Input {...register('student.lastname')} placeholder="Nom de l'étudiant" required />
        <Input {...register('grade')} type="number" step="0.01" placeholder="Note" required />
        <Input {...register('date')} type="date" required />
        <Button type="submit">{editingGrade ? 'Modifier' : 'Ajouter'} la note</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cours</TableHead>
            <TableHead>Étudiant</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(grade => (
            <motion.tr
              key={grade.unique_id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.01 }}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell>{grade.unique_id}</TableCell>
              <TableCell>{grade.course}</TableCell>
              <TableCell>{`${grade.student.firstname} ${grade.student.lastname}`}</TableCell>
              <TableCell>{grade.grade}</TableCell>
              <TableCell>{grade.date}</TableCell>
              <TableCell>
                <Button onClick={() => editGrade(grade)} className="mr-2 hover:scale-105 transition-transform">Modifier</Button>
                <Button onClick={() => deleteGrade(grade.unique_id)} variant="destructive" className="hover:scale-105 transition-transform">Supprimer</Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

