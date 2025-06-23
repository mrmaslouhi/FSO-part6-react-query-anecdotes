import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, incrementVotes } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const notificationReducer = (state = null, action) => {
  return action.payload
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const newVotesMutation = useMutation({
    mutationFn: incrementVotes,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const handleVote = (anecdote) => {
    newVotesMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'SET_MESSAGE', payload: `Voted '${anecdote.content}'`})
    setTimeout(() => {
      notificationDispatch({ type: 'SET_MESSAGE', payload: null})
    }, 5000)  }

  if (result.isLoading) {
    return <div>Loading anecdotes.......</div>
  }

  if (result.isError) {
    return <span>Anecdote service is not available due to problems occuring in the server. Error cause: {result.error.message}</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm notificationDispatch={notificationDispatch} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
