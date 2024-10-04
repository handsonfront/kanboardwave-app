const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
});

function dragStart(event) {
    this.classList.add('dragging');
    event.dataTransfer.setData('text/plain', this.id); // Armazena o ID do card arrastado
}

function dragEnd() {
    this.classList.remove('dragging');
}

cards.forEach(card => {
    card.addEventListener('dragover', dragOver);
    card.addEventListener('drop', drop);
});

function dragOver(event) {
    event.preventDefault(); // Permite que o card seja solto
    const draggingCard = document.querySelector('.dragging');
    const currentCard = this;

    // Verifica se o card arrastado não é o card atual
    if (draggingCard !== currentCard) {
        const cardRect = currentCard.getBoundingClientRect();
        const offset = cardRect.y + cardRect.height / 2; // Calcula a posição média do card atual

        if (event.clientY < offset) {
            currentCard.parentNode.insertBefore(draggingCard, currentCard); // Move para cima
        } else {
            currentCard.parentNode.insertBefore(draggingCard, currentCard.nextSibling); // Move para baixo
        }
    }
}

function drop(event) {
    event.preventDefault(); // Previne o comportamento padrão
}
