'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useData } from '@/hooks/useData'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function Statistics() {
  const { data, loading, error } = useData()
  const [averageGrade, setAverageGrade] = useState(0)
  const [studentCount, setStudentCount] = useState(0)
  const [courseAverages, setCourseAverages] = useState<{ name: string, average: number }[]>([])

  useEffect(() => {
    if (data.length > 0) {
      // Calculate overall average grade
      const avg = data.reduce((sum, grade) => sum + grade.grade, 0) / data.length
      setAverageGrade(avg)

      // Count unique students
      const uniqueStudents = new Set(data.map(grade => grade.student.id))
      setStudentCount(uniqueStudents.size)

      // Calculate course averages
      const courseGrades: { [key: string]: number[] } = {}
      data.forEach(grade => {
        if (!courseGrades[grade.course]) {
          courseGrades[grade.course] = []
        }
        courseGrades[grade.course].push(grade.grade)
      })

      const averages = Object.entries(courseGrades).map(([course, grades]) => ({
        name: course,
        average: grades.reduce((sum, grade) => sum + grade, 0) / grades.length
      }))
      setCourseAverages(averages)
    }
  }, [data])

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error.message}</div>

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardHeader>
              <CardTitle>Moyenne générale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{averageGrade.toFixed(2)}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardHeader>
              <CardTitle>Nombre d'étudiants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{studentCount}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card>
          <CardHeader>
            <CardTitle>Moyennes par cours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

