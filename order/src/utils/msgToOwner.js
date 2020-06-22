module.exports = ({ _id: id }) => ({
  to: 'modos.design.info@gmail.com',
  from: `admin@modos-design.lt`,
  subject: 'Buvo padarytas užsakymas - ' + id,
  text: 'Užsakymas',
  html: `
    <p>Užsakymo numeris: ${id}</p>
    <p>Užsakymo nuoroda:
      <a href="https://modosdesign.lt/admin/uzsakymai/${id}">
        https://modosdesign.lt/admin/uzsakymai/${id}
      </a>
    </p>
  `
})
