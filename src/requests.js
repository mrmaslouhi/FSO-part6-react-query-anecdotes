import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const postNewAnecdote = (newAnecdote) => {
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const incrementVotes = incrementedAnecdote => {
  return axios.put(`${baseUrl}/${incrementedAnecdote.id}`, incrementedAnecdote)
}