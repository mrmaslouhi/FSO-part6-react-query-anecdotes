import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postNewAnecdote } from '../requests'

const AnecdoteForm = ({ notificationDispatch }) => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: postNewAnecdote,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET_MESSAGE', payload: `Added ${content}`})
    setTimeout(() => {
      notificationDispatch({ type: 'SET_MESSAGE', payload: null})
    }, 5000)
}

  return (
    <div>
      <h3>post new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">post</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
