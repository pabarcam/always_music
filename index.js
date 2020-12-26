const yargs = require('yargs')
const db = require('./db')

const argv = yargs.command('nuevo', 'Comando para agregar un nuevo estudiante', {
    nombre: {
      describe:'Nombre del nuevo estudiante',
      demand: true,
      alias: 'n'
    },
    rut: {
      describre: 'Identificacion del estudiamte',
      demand: true,
      alias: 'r'
    },
    curso: {
      describre: 'Curso de estudiante',
      demand: true,
      alias: 'c'
    },
    nivel: {
      describre: 'Nivel del estudiante',
      demand: true,
      alias: 'l'
    }
  },
  (args) => {
    db.query('INSERT INTO students (name, rut, course, level) VALUES ($1, $2, $3, $4) RETURNING *',
      [args.nombre, args.rut, args.curso, args.nivel],
      (err, result) => {
        if(err) console.log(err)
          console.log(result.rows)[0]
          db.pool.end()
      }
    )
  } 
)
.command('consulta', 'muestra todos los estudiantes', () => {
  db.query('SELECT * FROM students', [], (err, result) => {
    if(err) console.log(err)
    console.log(result.rows)
    db.pool.end()
  })
})
.command('editar', 'actualizar el estudiante', {
  nombre: {
    describre: 'Nombre del nuevo estudiante',
    demand: true,
    alias: 'n'
  },
  rut: {
    describre: 'Identificación única del estudiante',
    demand: true,
    alias: 'c'
  },
  curso: {
    describre: 'Curso del estudiante',
    demand: true,
    alias: 'c'
  },
  nivel: {
    describre: 'Nivel del estudiante',
    demand: true,
    alias: 'l'
  }
}, 
(args) => {
  db.query('UPDATE students SET name=$1, course=$3, level=$4 WHERE rut =$2 RETURNING *',
    [args.nombre, args.rut, args.curso, args.nivel],
    (err, result) => {
      if(err) console.log(err)
      console.log(result.rows[0])
      db.pool.end()
    }
  )
})
.command('consultarut', 'consulta 1 estudiante por toda su información', {
  rut: {
    describre: 'rut a buscar',
    demand: true,
    alias: 'r'
  }
},
(args) => {
  db.query('SELECT * FROM students WHERE rut=1', [args.rut], (err, result) => {
    if(err) console.log(err)
    console.log(result.rows[0])
    db.pool.end()
  })
})
.command('eliminar', 'eliminar 1 estudiante por rut', {
  rut: {
    describre: 'rut a eliminar',
    demand: true,
    alias: 'r'
  }
},
(args) => {
  db.query('DELETE FROM students WHERE rut=$1 RETURNING *', 
  [args.rut], (err, result) => {
    if(err) console.log(err)
    console.log(result.rows[0])
    db.pool.end()
  })
})
.help().argv
