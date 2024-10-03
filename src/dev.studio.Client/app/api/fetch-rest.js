// Desc: Fetch REST API calls


const getEntities = async (backendServiceUrl) => {
    const response = await fetch(backendServiceUrl)
    const data = await response.json()
    return data
}

const getEntity = async (backendServiceUrl, id) => {
    const response = await fetch(`${backendServiceUrl}/${id}`)
    const data = await response.json()
    return data
}

const createEntity = async (backendServiceUrl, entityFieldStateObj) => {

    let entity;

    for(const field in entityFieldStateObj) {
        if(entityFieldStateObj[field] === '') {
            return { error: 'Please fill in all fields' }        
        }
        
        let attrValue;
        let attrName;

        if(typeof field === 'object') {
            attrValue = entityFieldStateObj[field].id
            attrName = field.substring(5) + '.Id'
        } else {
            attrValue = entityFieldStateObj[field]
            attrName = field.substring(5)
        }
        entity[attrName] = attrValue
    }

    const response = await fetch(backendServiceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
    })
    const data = await response.json()
    return data
}

const updateEntity = async (backendServiceUrl, entity) => {
    const response = await fetch(`${backendServiceUrl}/${entity.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
    })
    const data = await response.json()
    return data
}

const deleteEntity = async (backendServiceUrl, id) => {
    const response = await fetch(`${backendServiceUrl}/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    return data
}

const fetchRest = {
        getEntities: getEntities,
        getEntity: getEntity,
        createEntity: createEntity,
        updateEntity: updateEntity,
        deleteEntity: deleteEntity
    }

export default  fetchRest;