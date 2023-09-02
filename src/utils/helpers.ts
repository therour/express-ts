const helpers = {
  pick<Key extends string>(
    obj: Record<string, unknown>,
    keys: readonly Key[],
  ): Record<Key, unknown> {
    return keys.reduce(
      (newObj, key) => {
        // eslint-disable-next-line security/detect-object-injection -- the key already filtered by keys parameters
        newObj[key] = obj[key]
        return newObj
      },
      {} as Record<Key, unknown>,
    )
  },
}

export default helpers
