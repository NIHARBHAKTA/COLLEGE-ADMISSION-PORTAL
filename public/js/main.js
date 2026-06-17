document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('apps-table-body');

    if (tableBody) {
        fetch('/api/applications')
            .then(res => res.json())
            .then(data => {
                if(data.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No admission applications received yet.</td></tr>`;
                    return;
                }
                data.forEach(app => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><strong>${app.name}</strong></td>
                        <td>${app.email}</td>
                        <td>${app.phone}</td>
                        <td>${app.course}</td>
                        <td>${app.marks12th}%</td>
                        <td><span class="status-badge">${app.status}</span></td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(err => console.error('Error fetching data:', err));
    }
});