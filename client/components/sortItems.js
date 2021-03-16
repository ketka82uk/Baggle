
export default function sortedItems(postings, userLocation, items) {
  if (!postings) {
    // sort by time of creation
    return items.sort(function(a, b) {
      return a.created_at - b.created_at
    }).reverse()
  } else if (postings) {
    let location = {}
    // sort by distance
    if (!userLocation) {
      location = {
        lat: 51.38025629025321,
        lng: -0.09548670685241464
      }
    } else {
      location = {
        lat: userLocation.lat,
        lng: userLocation.long
      }
    }

    return items.sort(function(a, b) {
      const prevDistance = locationDistance(location, a)
      const currDistance = locationDistance(location, b)
      return prevDistance - currDistance
    })
  }
}

function vectorDistance(dx, dy) {
  return Math.sqrt(dx * dx + dy * dy)
}

function locationDistance(item1, item2) {
  const owner2 = item2.owner
  const dx = item1.lat - owner2.lat
  const dy = item1.lng - owner2.lng
  return vectorDistance(dx, dy)
}