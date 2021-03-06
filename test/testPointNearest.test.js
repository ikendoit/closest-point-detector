import {
  findNearestPointOnPolygon
} from '../dist/index.js'

describe('test nearest point to a polygon', () => {
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

    const result = findNearestPointOnPolygon(polygon, point, 4)
    expect(result.type).toEqual('Point')
    expect(result.coordinates).toEqual([10,8])
    expect(result.distance).toEqual(2)
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

    const result = findNearestPointOnPolygon(polygon, point, 20)
    expect(result.type).toEqual('Point')
    expect(result.coordinates).toEqual([ 5.294117647058823, 11.176470588235295])
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

    const result = findNearestPointOnPolygon(polygon, point, 0.4)
    expect(result).toEqual(null)
  });
});
