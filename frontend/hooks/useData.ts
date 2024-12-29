import { useEffect, useState } from 'react'

type Student = {
  firstname: string
  lastname: string
  id: number
}

type Grade = {
  unique_id: number
  course: string
  student: Student
  date: string
  grade: number
}

export function useData() {
  const [data, setData] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch('/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

