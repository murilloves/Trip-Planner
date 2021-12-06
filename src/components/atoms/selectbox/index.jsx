import { useState } from 'react'
import { Input } from '@chakra-ui/react'

const CURRENCY = 'Currency'

const SelectBox = ({
  options = [],
  onChange,
  value,
  selectIndex,
  placeholder
}) => {
  const [inputValue, setInputValue] = useState(value || '')

  const onChangeInput = (ev) => {
    const inputValue = ev.target.value
    setInputValue(inputValue)

    onChange(inputValue, selectIndex)
  }

  return (
    <>
      <Input borderColor="transparent" placeholder={placeholder} list="main-country" value={inputValue} onChange={onChangeInput} />
      <datalist id="main-country">
        { options.map((item) => (
          <option
            key={item.name}
            value={`${item.emoji}   ${item.name}`}>
              {`${CURRENCY}: ${item.currency}`}
          </option>
        ))}
      </datalist>
    </>
  )

}

export { SelectBox }
