'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentManager from './StudentManager'
import CourseManager from './CourseManager'
import GradeManager from './GradeManager'
import Statistics from './Statistics'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('students')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="students">Étudiants</TabsTrigger>
        <TabsTrigger value="courses">Cours</TabsTrigger>
        <TabsTrigger value="grades">Notes</TabsTrigger>
        <TabsTrigger value="stats">Statistiques</TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        <StudentManager />
      </TabsContent>
      <TabsContent value="courses">
        <CourseManager />
      </TabsContent>
      <TabsContent value="grades">
        <GradeManager />
      </TabsContent>
      <TabsContent value="stats">
        <Statistics />
      </TabsContent>
    </Tabs>
  )
}

