export const handleAlert = (ref) => {
    const AlertComponent = ref.current;
    if(AlertComponent.style.display === 'block'){ 
        AlertComponent.style.display = 'none';
    } else {
        AlertComponent.style.display = 'block';
        setTimeout(() => {AlertComponent.style.display = 'none'}, 1500);
    }
}