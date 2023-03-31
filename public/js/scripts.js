(function readyJS(win, doc){
    if(doc.querySelectorAll('.deletar')){
        for(let i=0;i < doc.querySelectorAll('.deletar').length; i++){
            doc.querySelectorAll('.deletar')[i].addEventListener('click',function(event){
               if (confirm("Deseja mesmo apagar esse Patrimonio?")){
                return true;
               } else{
                event.preventDefault();
               }
            })

        }
    }
}(document));