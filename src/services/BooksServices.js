import axios from "axios";

async function getAll(params = {}) {
  const result = await axios.get("http://localhost:3000/books", {
    params: params
  })
  return result
}

async function create(body) {
  console.log(body, ' body')
  const result = await axios.post("http://localhost:3000/books", body)
  return result
}

async function remove(id) {
  const result = await axios.delete(`http://localhost:3000/books/${id}`)
  return result
}


async function update(id, data) {
  const result = await axios.patch(`http://localhost:3000/books/${id}`, data)
  return result
}

export {
  getAll,
  create,
  remove,
  update
}