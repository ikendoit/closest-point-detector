import {
  findNearestVertexOnPolygon
} from '../dist/index.js'

describe('find nearest vertex of a polygon to a point', () => {
  it('simple square', () => {
    const polygon = {
      type: 'Polygon',
      coordinates: [[
        [0,0],
        [0,10],
        [10,10],
        [10,0],
        [0,0]
      ]]
    }
    const point = {
      type: 'Point', 
      coordinates: [ 12, 8 ]
    }

    const result = findNearestVertexOnPolygon(polygon, point, 4)
    expect(result.type).toEqual('Point')
    expect(result.coordinates).toEqual([10,10])
  });
  it('hexagon shape', () => {
    const polygon = {
      type: 'Polygon',
      coordinates: [[
        [0,0],
        [-3,3],
        [-3,10],
        [0,15],
        [3,15],
        [6,10],
        [6,3],
        [3,0],
        [0,0]
      ]]
    }
    const point = {
      type: 'Point', 
      coordinates: [ 20,20  ]
    }

    const result = findNearestVertexOnPolygon(polygon, point, 20)
    expect(result.type).toEqual('Point')
    expect(result.coordinates).toEqual([ 6, 10 ])
  });
  it('NULL if capture threshold is too small (default: 0.03)', () => {
    const polygon = {
      type: 'Polygon',
      coordinates: [[
        [0,0],
        [0,10],
        [10,10],
        [10,0],
        [0,0]
      ]]
    }
    const point = {
      type: 'Point', 
      coordinates: [ 12, 8 ]
    }

    const result = findNearestVertexOnPolygon(polygon, point, 0.4)
    expect(result).toEqual(null)
  });
});
