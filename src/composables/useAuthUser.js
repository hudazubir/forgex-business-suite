import { computed, onMounted, ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const user = ref(null)
const profile = ref(null)

export function useAuthUser() {
  async function loadUser() {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()

    user.value = currentUser

    if (!currentUser) {
      profile.value = null
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, role, department, avatar_url')
      .eq('id', currentUser.id)
      .single()

    if (error) {
      console.error('Unable to load profile:', error.message)
      return
    }

    profile.value = data
  }

  onMounted(loadUser)

  const displayName = computed(() => {
    return profile.value?.full_name || 'User'
  })

  const role = computed(() => {
    return profile.value?.role || 'Team member'
  })

  const initials = computed(() => {
    return displayName.value
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  })

  const email = computed(() => user.value?.email || '')

  function clearUser() {
    user.value = null
    profile.value = null
  }

  return {
    displayName,
    role,
    initials,
    email,
    clearUser,
  }
}