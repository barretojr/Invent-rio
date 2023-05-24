(function (document) {
    if (document.querySelectorAll('.deletar')) {
        for (let i = 0; i < document.querySelectorAll('.deletar').length; i++) {
            document.querySelectorAll('.deletar')[i].addEventListener(
                'click',
                function (event) {
                    if (confirm('Deseja mesmo apagar esse Patrimonio?')) {
                        return true;
                    } else {
                        event.preventDefault();
                    }
                }
            );
        }
    }
})(document);

const editItems = () => {
    const editItemBtns = document.querySelectorAll('#edit-item-btn');

    editItemBtns.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            const itemId = event.target.dataset.itemId;
            const response = await fetch(`/api/items/${itemId}`);
            const data = await response.json();

            data.forEach(data => {
                document.querySelector('#patrimonio').value = data?.patrimonio ?? 'Nada';
                document.querySelector('#unidade').value = data?.unidade ?? 'Nada';
                document.querySelector('#descricao').value = data?.descricao ?? 'Nada';
                document.querySelector('#modelo').value = data?.modelo ?? 'Nada';
                document.querySelector('#localizacao').value = data?.localizacao ?? 'Nada';
                document.querySelector('#valorestim').value = data?.valorestim ?? 'Nada';
                document.querySelector('#usuario').value = data?.usuario ?? 'Nada';
                document.querySelector('#nserie').value = data?.nserie ?? 'Nada';
            });
        });
    })
}
editItems();

const formSubmit = () => {
    const form = document.querySelector('#modal-form');
    const formBtn = form.querySelector('[type="submit"]');
    const patrimonio = form.querySelector('#patrimonio');
    formBtn.addEventListener('click', () => {
        const itemId = parseInt(patrimonio.value, 10);

        if (typeof itemId !== 'number') return;

        const newRoute = `/items/${itemId}`;
        form.setAttribute('action', newRoute);
        form.submit();
    });
}

formSubmit();

const tableFilter = () => {
    const searchBtn = document.getElementById('filter-btn');
    const input = document.getElementById('input-filter');
    searchBtn.addEventListener('click', () => {
        const data = input.value;
        if (!data) {
            console.log('Teste');
        } else {
            const url = `${data}`;
            searchBtn.setAttribute('href', url);
            searchBtn.click();
        }
    });
}

tableFilter();

const inputValue = document.querySelectorAll('input[name=valorestim], input[name=input-valor-compra]');

const formatValue = (value) => {
    value = value.replace(/\D/g, '');
    value = (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return value;
};

inputValue.forEach(value => {
    value.addEventListener('input', (event) => {
        const formattedValue = formatValue(event.target.value);
        event.target.value = formattedValue;
    });
})

formatValue();