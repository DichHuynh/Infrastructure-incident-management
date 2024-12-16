// thay đổi trạng thái tài khoản
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length> 0){
    buttonsChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = status=="Active" ? "Inactive" : "Active";

            const formChangeStatus = document.querySelector("#form-change-status")
            const dataPath = formChangeStatus.getAttribute("data-path");
            const action = `${dataPath}/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.setAttribute("action", action);
            formChangeStatus.submit();
    });
});
}

const buttonDelete = document.querySelectorAll('[button-delete]');
if(buttonDelete.length >0){
    const formDeleteItem = document.querySelector('#form-delete-product');
    const path = formDeleteItem.getAttribute("data-path");

    buttonDelete.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const isConfirm = confirm("Do you want to delete this item?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const accountId = button.getAttribute("data-accountId");
                const action = `${path}/${id}/${accountId}?_method=DELETE`;
                formDeleteItem.setAttribute("action", action);
                formDeleteItem.submit();
            }
        });
    });
};