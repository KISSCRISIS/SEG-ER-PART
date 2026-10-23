function base() {
  return { attempted: 1, sections: [{ id: 1 }] };
}

async function extended() {
  return { ...base(), topics: [{ v: 1 }] };
}

export async function probe() {
  const result = await extended();
  return result.topics;
}
