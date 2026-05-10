// Shared lib: AI-powered advice generation with mock fallback

import { generateObject } from 'ai'
import { gateway } from '@ai-sdk/gateway'
import { z } from 'zod'
import type { Answers, AIAdvice, ConflictDetail } from './types'
import { MOCK_AI_ADVICE } from './mock-data'
import { buildAdvicePrompt } from './ai-prompt'

const AdviceSchema = z.object({
  perConflict: z.array(
    z.object({
      conflictId: z.number(),
      reason: z.string(),
      compromise: z.string(),
      cultural: z.string(),
    }),
  ),
  conclusion: z.string(),
})

export const getAdvice = async (
  answersA: Answers,
  answersB: Answers,
  top5: ConflictDetail[],
): Promise<AIAdvice> => {
  try {
    const modelId = process.env.AI_MODEL ?? 'anthropic/claude-sonnet-4-6'
    const { object } = await generateObject({
      model: gateway(modelId),
      schema: AdviceSchema,
      prompt: buildAdvicePrompt(answersA, answersB, top5),
    })
    return object
  } catch (err) {
    console.error('[ai-advice] fallback to mock', err)
    return { ...MOCK_AI_ADVICE, isFallback: true }
  }
}
