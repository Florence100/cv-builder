'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateProfile() {
  revalidatePath('/users/[id]/profile', 'page');
}
