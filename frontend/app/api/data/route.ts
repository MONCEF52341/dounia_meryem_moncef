import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  const dataFilePath = path.join(process.cwd(), 'data', 'data.json')
  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  const data = JSON.parse(fileContents)

  return NextResponse.json(data)
}

