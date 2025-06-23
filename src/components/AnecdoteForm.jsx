import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postNewAnecdote } from '../requests'

const AnecdoteForm = ({ notificationDispatch }) => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: postNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'SET_MESSAGE', payload: `Added ${content}` })
      setTimeout(() => {
        notificationDispatch({ type: 'SET_MESSAGE', payload: null })
      }, 5000)
    },
    onError: (error) => {
      notificationDispatch({ type: 'SET_MESSAGE', payload: 'error, anecdote must contain 5 or more characters' })
      setTimeout(() => {
        notificationDispatch({ type: 'SET_MESSAGE', payload: null })
      }, 5000)
    }
  })

  const onPost = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>post new</h3>
      <form onSubmit={onPost}>
        <input name='anecdote' />
        <button type="submit">post</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
