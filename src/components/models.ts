export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Satellite {
  path: string,
  properties: {
    physical: {
      name: string,
      Cl: number
      Cd: number,
      Cr: number,
      mass: number
    },
    orbital: {
      a0: number,
      e0: number,
      i0: number,
      raan0: number,
      argp0: number,
      nu0: number
    },
    formation: {
      formationIndex: number,
      isLeader: boolean
    },
    constellation: {
      constellationIndex: number,
    },
    control: {
      isControlled: boolean,
      maneuverNodes: string[]
    },
    attitude: {
      initialQuaternion: number[],
      initialAngVel: number[]
    }
  }
}
