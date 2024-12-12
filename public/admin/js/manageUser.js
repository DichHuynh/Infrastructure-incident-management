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