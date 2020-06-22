module.exports = ({ email, total, _id: id }) => ({
  to: email,
  from: 'modos.design.info@gmail.com',
  subject: 'NEATSAKYTI: Jūsų užsakymas modosdesign.lt - ' + id,
  text: 'Užsakymas',
  html: `
    <p>Jūsų užsakymas priimtas.</p>
    <p>Užsakymo numeris: ${id}</p>
    <p>Užsakymo instrukcijos:</p>
    <ol>
      <li>Įveskite užsakymo numerį į pavedimo paskirties laukelį</li>
      <li>Įveskite Monika Juozapavičienė į gavėjo laukelį</li>
      <li>Įveskite LT167044000361623185 į gavėjo banko sąskaitos laukelį (AB SEB Bankas)</li>
      <li>Įveskite nurodytą sumą: ${total} € į pavedimo sumos laukelį</li>
      <li>Atlikite apmokėjimą</li>
    </ol>
  `
})
