import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mockMenus } from '../src/data/mockMenus.js'

const OFFICIAL_ORIGIN = 'https://www.mcdonalds.co.kr'
const API_BASE = `${OFFICIAL_ORIGIN}/api/v1/kor/product/product/list`
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(projectRoot, 'public', 'images', 'menus')

const queries = [
  { mainCategory: 1, subCategory: 16 },
  { mainCategory: 4, subCategory: 8 },
  { mainCategory: 4, subCategory: 7 },
  { mainCategory: 5, subCategory: 9 },
  { mainCategory: 5, subCategory: 10 },
]

function normalizeName(value) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/[®™]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+(Small|Medium|Large)$/i, '')
    .replace(/\s+세트$/, '')
    .trim()
}

async function fetchOfficialProducts() {
  const productLists = await Promise.all(
    queries.map(async ({ mainCategory, subCategory }) => {
      const url = new URL(API_BASE)
      url.searchParams.set('page', '1')
      url.searchParams.set('view_rows', '100')
      url.searchParams.set('mainCategory', String(mainCategory))
      url.searchParams.set('subCategory', String(subCategory))
      url.searchParams.set('searchWord', '')

      const response = await fetch(url)
      if (!response.ok) throw new Error(`공식 메뉴 API 요청 실패: ${response.status}`)
      const payload = await response.json()
      return payload.resultObject?.list || []
    }),
  )

  return productLists.flat()
}

function findOfficialProduct(menu, officialProducts) {
  const targetName = normalizeName(menu.name)
  const exactMatch = officialProducts.find(
    (product) => normalizeName(product.korName) === targetName,
  )
  if (exactMatch) return exactMatch

  if (targetName === '맥스파이시 치킨 텐더 2조각') {
    return officialProducts.find(
      (product) => normalizeName(product.korName) === '맥스파이시 치킨 텐더',
    )
  }

  return null
}

async function main() {
  const officialProducts = await fetchOfficialProducts()
  await mkdir(outputDirectory, { recursive: true })

  const missing = []
  let downloaded = 0

  for (const menu of mockMenus) {
    const product = findOfficialProduct(menu, officialProducts)
    if (!product?.pcImageUrl) {
      missing.push(`${menu.id} ${menu.name}`)
      continue
    }

    const imageUrl = new URL(product.pcImageUrl, OFFICIAL_ORIGIN)
    const response = await fetch(imageUrl)
    if (!response.ok) {
      missing.push(`${menu.id} ${menu.name} (${response.status})`)
      continue
    }

    const imageBytes = Buffer.from(await response.arrayBuffer())
    await writeFile(path.join(outputDirectory, `${menu.id}.png`), imageBytes)
    downloaded += 1
  }

  console.log(`메뉴 이미지 ${downloaded}/${mockMenus.length}개 저장 완료`)
  if (missing.length > 0) {
    console.error(`누락 이미지:\n${missing.join('\n')}`)
    process.exitCode = 1
  }
}

await main()
