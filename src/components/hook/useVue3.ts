import {defineComponent, h, onMounted, ref} from "vue";

const useVue3 = (WebComponent) => {
    return defineComponent({
        props: {
            modelValue: [String, Number, Object, Array], // 다양한 타입을 지원하기 위해 배열로 지정
        },
        emits: ['update:modelValue'], // 상위 컴포넌트로 이벤트를 전달하기 위한 설정

        setup(props, { emit }) {
            const componentRef = ref(null);

            onMounted(() => {
                if (componentRef.value) {
                    // 커스텀 이벤트 리스너 등록
                    componentRef.value.addEventListener('click:value', (event) => {
                        emit('update:modelValue', event.detail.data);
                    });

                    // value 속성 설정
                    componentRef.value.value = props.modelValue;
                }
            });

            return () => h(WebComponent, {
                ref: componentRef,
                ...props,
                onInput: (event) => {
                    emit('update:modelValue', event.target.value);
                },
            });
        }
    });
}

export default useVue3;
