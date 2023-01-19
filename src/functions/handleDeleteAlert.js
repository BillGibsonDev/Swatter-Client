export const handleDeleteAlert = (ref) => {
    const AlertComponent = ref.current;
    if(AlertComponent.style.display === 'block'){ 
        AlertComponent.style.display = 'none';
    } else {
        AlertComponent.style.display = 'block';
    }
}