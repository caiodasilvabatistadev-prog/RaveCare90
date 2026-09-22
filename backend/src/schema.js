import { z } from 'zod';
export const registration = z.strictObject({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254).transform(value => value.trim().toLowerCase()),
  password: z.string().min(12).max(128)
});
export const login = registration.pick({ email: true, password: true });
const note = z.string().trim().max(3000);
const score = z.number().int().min(0).max(10);
export const answers = z.strictObject({
  birthDate: z.iso.date().optional(),
  weightKg: z.number().min(1).max(500).optional(),
  heightCm: z.number().min(30).max(260).optional(),
  goals: z.array(z.enum(['sleep', 'mental_health', 'cannabis_evaluation', 'fitness', 'events', 'harm_reduction', 'substance_reduction', 'alcohol_reduction', 'stop_smoking', 'nutrition', 'recovery', 'energy', 'other'])).max(13).optional(),
  conditions: note.optional(), medications: note.optional(),
  sleepScore: score.optional(),
  sleepHours: z.enum(['under5', '5to6', '6to7', '7to8', 'over8']).optional(),
  rested: z.enum(['often', 'sometimes', 'rarely', 'never']).optional(),
  mentalHealthScore: score.optional(), stressScore: score.optional(), fitnessScore: score.optional(),
  exercise: note.optional(),
  eventFrequency: z.enum(['rarely', 'monthly', '2to3monthly', 'weekly']).optional(),
  upcomingEvent: note.optional(),
  discussSubstances: z.enum(['yes', 'no', 'in_consultation']).optional(),
  cannabisInterest: z.boolean().optional(), additionalInfo: note.optional(), successDefinition: note.optional()
});
export const saveAnamnesis = z.strictObject({ version: z.number().int().min(0), answers });
export const submitAnamnesis = z.strictObject({ version: z.number().int().min(1) });
export const patientId = z.uuid();
